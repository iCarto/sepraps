from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from app.models.construction_contract import ConstructionContract
from app.util import format_decimal
from documents.base.base_models import BaseDocumentModel


class Amendment(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "amendment"
        verbose_name = "Adenda"
        verbose_name_plural = "Adendas"

    objects = ActiveManager()

    signature_date = models.DateField("Fecha de suscripción de la adenda")
    amendment_type = models.CharField("Tipo de adenda", max_length=50)
    extra_amount = models.DecimalField(
        "Monto de la adenda", max_digits=20, decimal_places=2, null=True
    )
    extra_period = models.IntegerField("Plazo de la adenda", null=True)

    contract = models.ForeignKey(
        ConstructionContract,
        on_delete=models.PROTECT,
        verbose_name="Contrato",
        related_name="contract_amendments",
    )

    @property
    def cumulative_contract_amended_amount(self):
        previous_amendments = Amendment.objects.filter(
            contract=self.contract, id__lte=self.id
        )
        cumulative_amended_amount = previous_amendments.aggregate(
            total=models.Sum("extra_amount")
        )["total"]

        return (
            format_decimal(self.contract.awarding_budget + cumulative_amended_amount)
            if cumulative_amended_amount
            else self.contract.awarding_budget
        )

    @property
    def cumulative_contract_amended_execution_period(self):
        previous_amendments = Amendment.objects.filter(
            contract=self.contract, id__lte=self.id
        )
        cumulative_amended_execution_period = previous_amendments.aggregate(
            total=models.Sum("extra_period")
        )["total"]

        return (
            format_decimal(
                self.contract.expected_execution_period
                + cumulative_amended_execution_period
            )
            if cumulative_amended_execution_period
            else self.contract.expected_execution_period
        )


@receiver(pre_save, sender=Amendment)
def amendment_pre_save(sender, instance, *args, **kwargs):
    if instance and (
        instance.amendment_type != "amount" and instance.amendment_type != "mixed"
    ):
        instance.extra_amount = None
    else:
        if instance and (
            instance.amendment_type != "expected_execution_period"
            and instance.amendment_type != "mixed"
        ):
            instance.extra_period = None
    return instance
