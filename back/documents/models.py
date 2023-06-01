from django.contrib.auth import get_user_model
from django.db import models


PATH_SEPARATOR = "/"


class MediaNode(models.Model):
    MEDIA_TYPE_CHOICES = [("FOLDER", "Carpeta"), ("DOCUMENT", "Documento")]

    id = models.AutoField(primary_key=True)
    media_type = models.CharField("Tipo", max_length=10, choices=MEDIA_TYPE_CHOICES)
    media_name = models.CharField("Nombre", max_length=100)
    media_content_type = models.CharField(
        "Tipo de contenido", null=True, max_length=100
    )
    media_size = models.BigIntegerField("Tamaño", null=True)
    storage_path = models.CharField("Ruta de almacenamiento", null=True, max_length=512)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, blank=True, null=True, related_name="children"
    )
    creation_user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    created_at = models.DateTimeField("Fecha de creación", null=True, auto_now_add=True)

    class Meta(object):
        db_table = "media_node"
        verbose_name = "MediaNode"
        verbose_name_plural = "MediaNodes"

    def __str__(self):
        return self.media_name

    @property
    def media_path(self):
        if not self.parent:
            return self.media_name
        return self.parent.media_path + PATH_SEPARATOR + self.media_name


class DocumentManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(media_type="DOCUMENT")


class Document(MediaNode):
    objects = DocumentManager()

    class Meta(object):
        proxy = True


class FolderManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(media_type="FOLDER")


class Folder(MediaNode):
    objects = FolderManager()

    class Meta(object):
        proxy = True


def create_folder_children(folder_parent, children):
    for folder_child_data in children:
        folder_child = Folder(
            media_type="FOLDER",
            media_name=folder_child_data.get("name"),
            storage_path=folder_parent.storage_path
            + PATH_SEPARATOR
            + folder_child_data.get("name"),
            parent=folder_parent,
            creation_user=get_user_model().objects.get(username="admin"),
        )
        folder_child.save()

        create_folder_children(folder_child, folder_child_data.get("children", []))


def create_folder_structure(media_name, storage_path, children_data):
    parent = None
    storage_parent_path = storage_path.split("/")[:-1]
    if storage_parent_path is not None:
        parent = Folder.objects.filter(media_name=storage_parent_path).first()
    root_folder = Folder(
        media_type="FOLDER",
        media_name=media_name,
        storage_path=storage_path,
        parent=parent,
        creation_user=get_user_model().objects.get(username="admin"),
    )
    root_folder.save()

    create_folder_children(root_folder, children_data)

    return root_folder
