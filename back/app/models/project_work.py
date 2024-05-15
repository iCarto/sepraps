import json
from pathlib import Path

from django.conf import settings
from django.db import models

from app.base.models.base_models import BaseModel


class ProjectWork(BaseModel):
    class Meta(object):
        db_table = "project_work"
        verbose_name = "Obra del proyecto"
        verbose_name_plural = "Obras del proyecto"

    work_type = models.CharField("Tipo de obra", max_length=50, null=True)
    work_class = models.CharField("Clase de obra", max_length=50, null=True)

    project = models.ForeignKey(
        "Project", on_delete=models.CASCADE, related_name="project_works"
    )


def get_project_work_data(work_type):
    data_path = (
        Path(settings.BASE_DIR) / "app" / "data" / "project" / f"{work_type}.json"
    )

    with Path.open(data_path) as f:
        return json.load(f)
