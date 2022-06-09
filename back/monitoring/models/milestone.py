from django.db import models
from monitoring.models.project import Project


PHASE_CHOICES = [
    ("design", "1. Diseño"),
    ("contracting", "2. Contratación"),
    ("execution", "3. Ejecución"),
    ("post-execution", "4. Post-construcción"),
]


class Milestone(models.Model):

    id = models.AutoField(primary_key=True)
    code = models.CharField("Código", max_length=50)
    name = models.CharField("Nombre", max_length=100)
    short_name = models.CharField("Nombre corto", max_length=100)
    checklist = models.JSONField("Validación", null=True)
    phase = models.CharField("Fase", max_length=50, choices=PHASE_CHOICES)
    compliance_date = models.DateField("Fecha de cumplimiento", blank=True, null=True)
    comments = models.TextField("Observaciones", max_length=500, blank=True, null=True)
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

    def get_phase_name(self):
        return dict(PHASE_CHOICES).get(self.phase, self.phase)

    def __str__(self):
        return self.code


def create_project_milestones(project, milestones, parent=None):
    for index, milestone_data in enumerate(milestones):
        milestone = Milestone(
            code=milestone_data.get("code"),
            name=milestone_data.get("name"),
            short_name=milestone_data.get("short_name"),
            checklist=milestone_data.get("checklist"),
            phase=milestone_data.get("phase"),
            project=project,
            parent=parent,
            ordering=index,
        )
        milestone.save()

        create_project_milestones(
            project, milestone_data.get("children", []), milestone
        )
