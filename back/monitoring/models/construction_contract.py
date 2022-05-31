from django.contrib.auth import get_user_model
from django.db import models
from monitoring.models.contact import Contact
from monitoring.models.contractor import Contractor
from monitoring.models.financing_program import FinancingProgram


class ConstructionContract(models.Model):

    id = models.AutoField(primary_key=True)
    number = models.CharField("Nombre", max_length=50)
    comments = models.TextField("Observaciones", max_length=500, null=True)

    bid_request_number = models.CharField("Número de llamado", max_length=50)
    bid_request_id = models.CharField("Identificador de llamado", max_length=50)
    bid_request_date = models.DateField("Fecha de llamado")
    bid_request_budget = models.DecimalField(
        "Monto total", max_digits=20, decimal_places=2
    )
    awarding_budget = models.DecimalField(
        "Monto total de adjudicación", max_digits=20, decimal_places=2, null=True
    )
    awarding_percentage_drop = models.DecimalField(
        "Monto total de adjudicación", max_digits=5, decimal_places=2, null=True
    )
    awarding_date = models.DateField("Fecha de adjudicación", null=True)

    financing_program = models.ForeignKey(
        FinancingProgram,
        on_delete=models.PROTECT,
        verbose_name=FinancingProgram._meta.verbose_name,
        null=True,
    )

    contractor = models.ForeignKey(
        Contractor,
        on_delete=models.PROTECT,
        verbose_name=Contractor._meta.verbose_name,
        null=True,
        related_name="contract",
    )
    field_manager = models.ForeignKey(
        Contact, on_delete=models.PROTECT, null=True, related_name="+"
    )
    construction_inspector = models.ForeignKey(
        Contact, on_delete=models.PROTECT, null=True, related_name="+"
    )
    construction_supervisor = models.ForeignKey(
        Contact, on_delete=models.PROTECT, null=True, related_name="+"
    )
    social_coordinator = models.ForeignKey(
        Contact, on_delete=models.PROTECT, null=True, related_name="+"
    )
    social_inspector = models.ForeignKey(
        Contact, on_delete=models.PROTECT, null=True, related_name="+"
    )
    social_supervisor = models.ForeignKey(
        Contact, on_delete=models.PROTECT, null=True, related_name="+"
    )
    execution_signature_date = models.DateField(
        "Fecha de firma del contrato", null=True
    )
    execution_certificate_start_date = models.DateField(
        "Fecha del acta de inicio", null=True
    )
    execution_final_delivery_date = models.DateField(
        "Fecha de recepción definitiva", null=True
    )
    warranty_end_date = models.DateField("Fin del periodo de garantía", null=True)
    expected_execution_period = models.IntegerField(
        "Plazo previsto de ejecución", null=True
    )

    closed = models.BooleanField(blank=False, null=False, default=False)
    creation_user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    created_at = models.DateTimeField("Fecha de creación", null=True, auto_now_add=True)
    updated_at = models.DateTimeField(
        "Fecha de última modificación", null=True, auto_now=True
    )

    class Meta:
        db_table = "construction_contract"
        verbose_name = "Contrato de obras"
        verbose_name_plural = "Contratos de obras"

    def __str__(self):
        return self.number
