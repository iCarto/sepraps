from django.db import models

from app.base.models.base_models import ActiveManager
from app.models.contract_service import ContractService


WORK_AREA_CHOICES = (("building", "Obras"), ("social", "Social"))


class ContractServiceValue(models.Model):
    class Meta(object):
        db_table = "contract_service_value"

    code = models.CharField("Código", max_length=50)
    value = models.TextField("Valor", max_length=255)

    contract_service = models.ForeignKey(
        ContractService,
        on_delete=models.PROTECT,
        null=True,
        related_name="contract_service_values",
    )
