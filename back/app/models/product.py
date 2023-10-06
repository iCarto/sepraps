from django.db import models

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from app.models.payment import Payment
from documents.base.base_models import BaseDocumentModel
from documents.folder_utils import sanitize_field_value
from documents.models import Folder


STATUS_CHOICES = (("entregado", "Entregado"), ("no_entregado", "No entregado"))


class Product(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "product"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    objects = ActiveManager()

    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", max_length=255)

    status = models.CharField(
        "Estado",
        max_length=20,
        choices=STATUS_CHOICES,
        null=False,
        default="no_entregado",
    )
    presentation_date = models.DateField("Fecha de entrega", null=True)

    payment = models.ForeignKey(
        Payment,
        on_delete=models.PROTECT,
        verbose_name="Pago",
        null=True,
        related_name="products",
    )

    def get_status_label(self):
        return dict(STATUS_CHOICES).get(self.status, self.status)

    def post_create(self, sender, created, *args, **kwargs):
        if created:
            classtype = type(self).__name__
            media_name = sanitize_field_value(self.name)
            folder = Folder(
                media_type="FOLDER",
                media_name="{0}".format(media_name),
                storage_path="{0}/{1}/{2}".format(
                    self.payment.folder.storage_path,
                    classtype.lower(),
                    media_name.lower(),
                ),
                parent=self.payment.folder,
                creation_user=self.created_by,
            )
            folder.save()

            self.folder = folder
            self.save()
