from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from app.models.comment import Comment
from app.util import format_decimal
from documents.base.base_models import BaseDocumentModel


class BuildingComponentMonitoring(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "building_component_monitoring"
        verbose_name = "Seguimiento de componente de construcción"
        verbose_name_plural = "Seguimientos de componente de construcción"

    objects = ActiveManager()

    execution_status = models.CharField("Estado de ejecución", max_length=20, null=True)
    quality_status = models.CharField("Estado cualitativo", max_length=20, null=True)

    expected_amount = models.DecimalField(
        "Monto previsto", max_digits=20, decimal_places=2, null=True
    )
    expected_end_date = models.DateField("Fecha de finalización prevista", null=True)

    paid_amount = models.DecimalField(
        "Monto real actual", max_digits=20, decimal_places=2, null=True
    )
    pending_amount = models.DecimalField(
        "Monto pendiente", max_digits=20, decimal_places=2, null=True
    )
    real_end_date = models.DateField("Fecha de finalización real", null=True)
    physical_progress_percentage = models.DecimalField(
        "Porcentaje de avance físico", max_digits=5, decimal_places=2, null=True
    )

    building_component = models.ForeignKey(
        "BuildingComponent",
        on_delete=models.CASCADE,
        related_name="building_component_monitorings",
    )
    project = models.ForeignKey(
        "Project", on_delete=models.CASCADE, related_name="project_building_monitorings"
    )
    comments = models.ManyToManyField(Comment)

    @property
    def total_amount(self):
        if not self.paid_amount and not self.pending_amount:
            return None
        return format_decimal((self.paid_amount or 0) + (self.pending_amount or 0))

    @property
    def financial_progress_percentage(self):
        if self.paid_amount and self.expected_amount:
            return format_decimal((self.paid_amount / (self.expected_amount)) * 100)
        return None


@receiver(pre_save, sender=BuildingComponentMonitoring)
def component_pre_save(sender, instance, *args, **kwargs):
    if instance.execution_status == "finalizado":
        instance.pending_amount = 0
