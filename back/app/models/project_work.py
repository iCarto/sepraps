import json
from pathlib import Path

from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

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


@receiver(post_save, sender=ProjectWork)
def post_create(sender, instance, created, *args, **kwargs):
    """Create project folder structure and project milestones from template."""
    if not created:
        return

    project = instance.project
    data = {}
    data_path = (
        Path(settings.BASE_DIR)
        / "app"
        / "data"
        / "project"
        / f"{instance.work_type}.json"
    )

    with Path.open(data_path) as f:
        data = json.load(f)

    project.create_structure_data(data)
    project.create_components_data(instance.work_class, data)
