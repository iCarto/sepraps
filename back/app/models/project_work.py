import json

from django.db import models

from app.base.models.base_models import BaseModel
from app.models.project_work_type import ProjectWorkType


class ProjectWork(BaseModel):
    class Meta(object):
        db_table = "project_work"
        verbose_name = "Obra del proyecto"
        verbose_name_plural = "Obras del proyecto"

    work_type = models.ForeignKey(
        ProjectWorkType, db_column="work_type", on_delete=models.DO_NOTHING
    )
    work_class = models.CharField("Clase de obra", max_length=50, null=True)

    project = models.ForeignKey(
        "Project", on_delete=models.CASCADE, related_name="project_works"
    )


def get_project_work_config(work_type):
    try:
        return json.load(ProjectWorkType.objects.get(pk=work_type).config_file)
    except ProjectWorkType.DoesNotExist:
        return {}
