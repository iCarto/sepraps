from django.db import models


WORK_AREA_CHOICES = (("building", "Obras"), ("social", "Social"))


class ContractServiceValue(models.Model):
    class Meta(object):
        db_table = "contract_service_value"

    code = models.CharField("Código", max_length=50)
    value = models.TextField("Valor", max_length=255, null=True)

    contract_service = models.ForeignKey(
        "ContractService",
        on_delete=models.PROTECT,
        null=True,
        related_name="contract_service_values",
    )
