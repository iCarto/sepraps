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
    media_path = models.CharField("Ruta de almacenamiento", null=True, max_length=512)
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, blank=True, null=True, related_name="children"
    )

    class Meta:
        db_table = "media_node"
        verbose_name = "MediaNode"
        verbose_name_plural = "MediaNodes"

    def __str__(self):
        return self.media_name

    @property
    def path(self):
        if not self.parent:
            return self.media_name
        return self.parent.path + PATH_SEPARATOR + self.media_name


class DocumentManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(media_type="DOCUMENT")


class Document(MediaNode):
    objects = DocumentManager()

    class Meta:
        proxy = True


class FolderManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(media_type="FOLDER")


class Folder(MediaNode):
    objects = FolderManager()

    class Meta:
        proxy = True
