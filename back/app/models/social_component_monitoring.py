from django.db import models

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from app.models.comment import Comment
from documents.base.base_models import BaseDocumentModel


class SocialComponentMonitoring(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "social_component_monitoring"
        verbose_name = "Seguimiento de componente social"
        verbose_name_plural = "Seguimientos de componente social"

    objects = ActiveManager()

    code = models.CharField("Código", max_length=50)
    name = models.CharField("Nombre", max_length=255)
    execution_status = models.CharField("Estado de ejecución", max_length=20, null=True)
    quality_status = models.CharField("Estado cualitativo", max_length=20, null=True)

    expected_end_date = models.DateField("Fecha de finalización prevista", null=True)
    real_end_date = models.DateField("Fecha de finalización real", null=True)
    progress_percentage = models.DecimalField(
        "Porcentaje de progreso", max_digits=5, decimal_places=2, null=True
    )

    project = models.ForeignKey(
        "Project", on_delete=models.CASCADE, related_name="project_social_monitorings"
    )
    comments = models.ManyToManyField(Comment)

    @property
    def trainings(self):
        return self.social_component_monitoring_trainings.all()


def create_project_social_components(project, components):
    for component_code, component_config in components.items():
        component = SocialComponentMonitoring(
            code=component_code,
            name=component_config.get("name"),
            project=project,
            created_by=project.creation_user,
            updated_by=project.creation_user,
        )
        component.save()
