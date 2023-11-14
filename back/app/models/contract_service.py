from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from app.models.contract_service_value import ContractServiceValue
from documents.base.base_models import BaseDocumentModel


class ContractService(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "contract_service"
        verbose_name = "Servicio"
        verbose_name_plural = "Servicios"

    objects = ActiveManager()

    code = models.CharField("Código", max_length=50)
    name = models.CharField("Nombre", max_length=255)
    supervision_areas = ArrayField(models.CharField(max_length=50), null=False)
    properties = models.JSONField("Campos", null=True)

    contract = models.ForeignKey(
        "ConstructionContract",
        on_delete=models.PROTECT,
        verbose_name="Contrato",
        related_name="contract_services",
    )


@receiver(post_save, sender=ContractService)
def contract_service_post_save(sender, instance, created, *args, **kwargs):
    if created:
        cs_properties = instance.properties
        for cs_property in cs_properties:
            contract_service_value = ContractServiceValue(
                code=cs_property, value=None, contract_service=instance
            )
            contract_service_value.save()
