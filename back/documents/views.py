import os
import tempfile
import zipfile

from django.conf import settings
from django.http import FileResponse
from django.views.decorators.cache import cache_control
from rest_framework import parsers, status, views
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from documents import storage
from documents.models import MediaNode
from documents.serializers import MediaLeafNodeSerializer, MediaNodeSerializer
from documents.storage import delete, open, save


def get_filter(media_path):
    media_path_nodes = media_path.split("/")
    filter = {}
    for idx, media_path_node in enumerate(media_path_nodes[::-1]):
        parent_access = "parent__" * idx
        filter[parent_access + "media_name"] = media_path_node
    return filter


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@cache_control(private=True, max_age=60 * 60 * 24)
def preview(request, media_path, format=None):
    filter = get_filter(media_path)
    media_node = MediaNode.objects.filter(**filter).first()
    if media_node.media_type == "DOCUMENT":
        file = open(os.path.join(settings.MEDIA_ROOT, media_node.media_path))
        response = FileResponse(file)
        return response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def download(request, media_path, format=None):
    filter = get_filter(media_path)
    media_node = MediaNode.objects.filter(**filter).first()
    if media_node.media_type == "DOCUMENT":
        file = open(os.path.join(settings.MEDIA_ROOT, media_node.media_path))
        return FileResponse(file, as_attachment=True, filename=media_node.media_name)
    if media_node.media_type == "FOLDER":
        zip_file = create_zip_file(media_node.children.all())
        return FileResponse(
            zip_file, as_attachment=True, filename=media_node.media_name + ".zip"
        )


def create_zip_file(documentos):
    # TODO. To be improved. Un par de cosas a tener en cuenta:
    # * TemporaryFile, SpooledTemporaryFile y StringIO no generan/aseguran que
    # hay un path en disco.
    # FileResponse nececita un path a disco y hacen un open(path, 'r'). Al acabar
    # hace un close.
    # NameTemporaryFile por defecto hace un open(w+b), y ZipFile si le pasamos un
    # path hace un open(w). Es decir abrimos el fichero dos veces. Con el del FileResponse
    # también se abriría de nuevo. En Windows esto no funciona.
    # https://stackoverflow.com/questions/12949077/
    # https://stackoverflow.com/questions/11967720/
    # https://stackoverflow.com/questions/23212435/
    # https://stackoverflow.com/questions/12881294/

    tmp = tempfile.NamedTemporaryFile()
    with zipfile.ZipFile(tmp, "w", compression=zipfile.ZIP_DEFLATED) as zip:
        zip_folder_documents(None, documentos, zip)
    tmp.seek(0)
    return tmp


def zip_folder_documents(parent_path_in_zip, documents, zip):
    for document in documents:
        if document.media_type == "DOCUMENT":
            path_in_disk = storage.open(
                os.path.join(settings.MEDIA_ROOT, document.media_path)
            )
            if os.path.isfile(path_in_disk.name):
                path_in_zip = os.path.join(
                    parent_path_in_zip if parent_path_in_zip is not None else "",
                    document.media_name,
                )
                zip.write(path_in_disk.name, path_in_zip)

        if document.media_type == "FOLDER":
            path_in_zip = (
                os.path.join(parent_path_in_zip, document.media_name)
                if parent_path_in_zip is not None
                else os.path.join(document.media_name)
            )

            zip_folder_documents(path_in_zip, document.children.all(), zip)


class MediaView(views.APIView):
    serializer_class = MediaNodeSerializer
    parser_classes = [parsers.FileUploadParser]
    queryset = MediaNode.objects.all()

    def get(self, request, media_path):
        filter = get_filter(media_path)
        media_node = MediaNode.objects.filter(**filter).first()

        if media_node:
            if media_node.media_type == "DOCUMENT":
                serializer = MediaLeafNodeSerializer(
                    media_node, context={"request": request}
                )
                return Response(serializer.data, status=status.HTTP_200_OK)

            if media_node.media_type == "FOLDER":
                serializer = MediaNodeSerializer(
                    media_node, context={"request": request}
                )
                return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, media_path, format=None):
        file = request.data.get("file", None)
        if file:
            path = save(os.path.join(settings.MEDIA_ROOT, media_path), file)

            parent_path = "/".join(media_path.split("/")[:-1])
            parent_filter = get_filter(parent_path)
            parent = MediaNode.objects.filter(**parent_filter).first()

            if parent:
                media_node = {
                    "media_type": "DOCUMENT",
                    "media_name": file.name,
                    "media_content_type": file.content_type,
                    "media_size": file.size,
                    "storage_path": path,
                    "parent": parent.id,
                }
                serializer = MediaNodeSerializer(
                    data=media_node, context={"request": request}
                )
                if serializer.is_valid():
                    serializer.validated_data["creation_user"] = request.user
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, media_path):
        filter = get_filter(media_path)
        media_node = MediaNode.objects.filter(**filter).first()

        delete(os.path.join(settings.MEDIA_ROOT, media_node.media_path))
        media_node.delete()

        return Response(status=status.HTTP_200_OK)
