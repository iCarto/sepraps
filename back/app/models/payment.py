from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from app.models.comment import Comment
from app.models.construction_contract import ConstructionContract
from app.util import format_decimal
from documents.base.base_models import BaseDocumentModel


class Payment(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "payment"
        verbose_name = "Pago"
        verbose_name_plural = "Pagos"

    objects = ActiveManager()

    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", max_length=255)

    expected_fixed_amount = models.DecimalField(
        "Monto fijo previsto", max_digits=20, decimal_places=2, null=True
    )
    expected_variable_amount = models.DecimalField(
        "Monto variable previsto", max_digits=20, decimal_places=2, null=True
    )
    expected_total_amount = models.DecimalField(
        "Monto previsto", max_digits=20, decimal_places=2, null=True
    )
    expected_payment_date = models.DateField("Fecha de pago prevista", null=True)

    paid_fixed_amount = models.DecimalField(
        "Monto fijo", max_digits=20, decimal_places=2, null=True
    )
    paid_variable_amount = models.DecimalField(
        "Monto variable", max_digits=20, decimal_places=2, null=True
    )
    paid_total_amount = models.DecimalField(
        "Monto", max_digits=20, decimal_places=2, null=True
    )

    status = models.CharField("Estado", max_length=20, null=False, default="no_pagado")
    payment_date = models.DateField("Fecha de pago", null=True)

    contract = models.ForeignKey(
        ConstructionContract,
        on_delete=models.PROTECT,
        verbose_name="Contrato",
        null=True,
        related_name="contract_payments",
    )
    comments = models.ManyToManyField(Comment)

    @property
    def expected_total_amount_cumulative(self):
        contract_expected_total_amount_cumulative = Payment.objects.filter(
            contract=self.contract, id__lte=self.id
        ).aggregate(total=models.Sum("expected_total_amount"))["total"]
        if not contract_expected_total_amount_cumulative:
            return None
        return format_decimal(contract_expected_total_amount_cumulative)

    @property
    def paid_total_amount_cumulative(self):
        contract_paid_total_amount_cumulative = Payment.objects.filter(
            contract=self.contract, id__lte=self.id
        ).aggregate(total=models.Sum("paid_total_amount"))["total"]
        if not contract_paid_total_amount_cumulative:
            return None
        return format_decimal(contract_paid_total_amount_cumulative)


@receiver(pre_save, sender=Payment)
def provider_pre_save(sender, instance, *args, **kwargs):
    if instance and instance.contract.payment_criteria_type != "fijo_variable":
        instance.expected_fixed_amount = None
        instance.expected_variable_amount = None
        instance.paid_fixed_amount = None
        instance.paid_variable_amount = None
    else:
        if instance.expected_fixed_amount or instance.expected_variable_amount:
            expected_fixed_amount = instance.expected_fixed_amount or 0
            expected_variable_amount = instance.expected_variable_amount or 0
            instance.expected_total_amount = (
                expected_fixed_amount + expected_variable_amount
            )
        else:
            instance.expected_total_amount = None
        if instance.paid_fixed_amount or instance.paid_variable_amount:
            paid_fixed_amount = instance.paid_fixed_amount or 0
            paid_variable_amount = instance.paid_variable_amount or 0
            instance.paid_total_amount = paid_fixed_amount + paid_variable_amount
        else:
            instance.paid_total_amount = None
    return instance
