from django.http import HttpResponse
from documents.models import MediaNode
from documents.serializers import MediaNodeSerializer
from documents.storage import open, save
from rest_framework import parsers, status, views
from rest_framework.response import Response


def get_filter(path):
    path_nodes = path.split("/")
    filter = {}
    for idx, path_node in enumerate(path_nodes[::-1]):
        parent_access = "parent__" * idx
        filter[parent_access + "media_name"] = path_node
    return filter


class MediaView(views.APIView):
    serializer_class = MediaNodeSerializer
    parser_classes = [parsers.FileUploadParser]

    def get(self, request, path):
        filter = get_filter(path)
        media_node = MediaNode.objects.filter(**filter).first()
        if media_node.media_type == "FOLDER":
            serializer = MediaNodeSerializer(media_node, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)

        file = open(media_node.media_path)
        response = HttpResponse(file, content_type=media_node.media_content_type)
        response["Content-Length"] = file.size
        response["Content-Disposition"] = (
            'attachment; filename="%s"' % media_node.media_name
        )
        return response

    def post(self, request, path, format=None):
        file = request.data.get("file", None)
        if file:
            path = save(path, file)

            parent_path = "/".join(path.split("/")[:-1])
            parent_filter = get_filter(parent_path)
            parent = MediaNode.objects.filter(**parent_filter).first()

            if parent:
                media_node = {
                    "media_type": "DOCUMENT",
                    "media_name": file.name,
                    "media_content_type": file.content_type,
                    "media_path": path,
                    "parent": parent.id,
                }
                serializer = MediaNodeSerializer(
                    data=media_node, context={"request": request}
                )
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)
