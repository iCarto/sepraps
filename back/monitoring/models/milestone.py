import json

from django.db import models
from monitoring.models.project import Project


CATEGORY_CHOICES = [
    ("funding_allocation", "Asignación de financiación"),
    ("approval_technical_folder", "Aprobación de la carpeta técnica"),
    ("call_for_tenders_works_contract", "Llamado de licitación del contrato de obras"),
    ("award_works_contract", "Adjudicación del contrato de obras"),
    ("contract_signing", "Firma del contrato"),
    ("start_of_works", "Inicio de las obras"),
    ("definitive_reception", "Recepción definitiva por la administración"),
    (
        "system_delivery",
        "Entrega del sistema a la comunidad y transferencia de operación y"
        " mantenimiento",
    ),
    ("technical_validation", "Validación del checklist técnico"),
    ("technical_validation_drilling", "Perforación"),
    ("technical_validation_pump_test", "Prueba de bombeo"),
    ("final_settlement", "Liquidación final"),
    ("end_of_warranty", "Fin del periodo de garantía"),
]

PHASE_CHOICES = [
    ("design", "Diseño"),
    ("contracting", "Contratación"),
    ("execution", "Ejecución"),
    ("post-execution", "Post-construcción"),
]


class Milestone(models.Model):

    id = models.AutoField(primary_key=True)
    category = models.CharField("Categoría", max_length=50, choices=CATEGORY_CHOICES)
    phase = models.CharField("Fase", max_length=50, choices=PHASE_CHOICES)
    compliance_date = models.DateField("Fecha de cumplimiento", blank=True, null=True)
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        verbose_name=Project._meta.verbose_name,
        related_name="milestones",
    )
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, blank=True, null=True, related_name="children"
    )
    ordering = models.IntegerField("Orden")

    class Meta:
        db_table = "milestone"
        verbose_name = "Hito"
        verbose_name_plural = "Hitos"

    def get_category_name(self):
        return dict(CATEGORY_CHOICES).get(self.category, self.category)

    def get_phase_name(self):
        return dict(PHASE_CHOICES).get(self.phase, self.phase)

    def __str__(self):
        return self.value


def create_project_milestones(project, children, parent=None):
    for index, milestone_data in enumerate(children):
        milestone = Milestone(
            category=milestone_data.get("category"),
            phase=milestone_data.get("phase"),
            project=project,
            parent=parent,
            ordering=index,
        )
        milestone.save()

        create_project_milestones(
            project, milestone_data.get("children", []), milestone
        )
