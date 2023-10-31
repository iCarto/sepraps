from django.db import models

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from documents.base.base_models import BaseDocumentModel


class ContractService(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "contract_service"
        verbose_name = "Servicio"
        verbose_name_plural = "Servicios"

    objects = ActiveManager()

    code = models.CharField("Código", max_length=50)
    name = models.CharField("Nombre", max_length=255)

    contract = models.ForeignKey(
        "ConstructionContract",
        on_delete=models.PROTECT,
        verbose_name="Contrato",
        null=True,
        related_name="payments",
    )
