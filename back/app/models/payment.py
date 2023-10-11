from django.db import models

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from app.models.comment import Comment
from app.models.construction_contract import ConstructionContract
from documents.base.base_models import BaseDocumentModel


STATUS_CHOICES = (("pagado", "Pagado"), ("no_pagado", "No pagado"))


class Payment(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "payment"
        verbose_name = "Pago"
        verbose_name_plural = "Pagos"

    objects = ActiveManager()

    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", max_length=255)

    fixed_amount = models.DecimalField(
        "Monto fijo", max_digits=20, decimal_places=2, null=True
    )
    variable_amount = models.DecimalField(
        "Monto variable", max_digits=20, decimal_places=2, null=True
    )
    expected_fixed_amount = models.DecimalField(
        "Monto fijo previsto", max_digits=20, decimal_places=2, null=True
    )
    expected_variable_amount = models.DecimalField(
        "Monto variable", max_digits=20, decimal_places=2, null=True
    )

    status = models.CharField(
        "Estado", max_length=20, choices=STATUS_CHOICES, null=False, default="no_pagado"
    )
    payment_date = models.DateField("Fecha de pago", null=True)

    contract = models.ForeignKey(
        ConstructionContract,
        on_delete=models.PROTECT,
        verbose_name="Contrato",
        null=True,
        related_name="payments",
    )
    comments = models.ManyToManyField(Comment)

    def get_status_label(self):
        return dict(STATUS_CHOICES).get(self.status, self.status)
