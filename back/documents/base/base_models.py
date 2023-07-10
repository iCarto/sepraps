from django.db import models

from documents.folder_utils import create_folder
from documents.models import MediaNode


class BaseDocumentModel(models.Model):
    class Meta(object):
        abstract = True

    folder = models.ForeignKey(
        MediaNode,
        on_delete=models.PROTECT,
        verbose_name="Directorio",
        null=True,
        related_name="folder+",
    )
    featured_image = models.ForeignKey(
        MediaNode,
        on_delete=models.SET_NULL,
        verbose_name="Imaxe destacada",
        null=True,
        related_name="featured_image+",
    )
    featured_document = models.ForeignKey(
        MediaNode,
        on_delete=models.SET_NULL,
        verbose_name="Documento destacado",
        null=True,
        related_name="featured_document+",
    )

    @classmethod
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        models.signals.post_save.connect(post_create_call, sender=cls)

    def post_create(self, sender, created, *args, **kwargs):
        if created:
            create_folder(self, created=created)


def post_create_call(sender, instance, created, *args, **kwargs):
    instance.post_create(sender, created, *args, **kwargs)
