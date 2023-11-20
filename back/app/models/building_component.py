from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from app.models.building_component_monitoring import BuildingComponentMonitoring
from app.models.building_component_value import BuildingComponentValue


class BuildingComponent(BaseEntityModelMixin):
    class Meta(object):
        db_table = "building_component"
        verbose_name = "Componente de construcción"
        verbose_name_plural = "Componente de construcción"

    objects = ActiveManager()

    code = models.CharField("Código", max_length=50)
    name = models.CharField("Nombre", max_length=255)
    properties = models.JSONField("Campos", null=True)


@receiver(post_save, sender=BuildingComponent)
def building_component_post_save(sender, instance, created, *args, **kwargs):
    if created:
        bc_properties = instance.properties
        for bc_property in bc_properties:
            building_component_value = BuildingComponentValue(
                code=bc_property, value=None, building_component=instance
            )
            building_component_value.save()


def create_project_building_components(project, components):
    for component_code, component_config in components.items():
        component = BuildingComponent(
            code=component_code,
            name=component_config.get("name"),
            properties=component_config.get("properties"),
            created_by=project.creation_user,
            updated_by=project.creation_user,
        )
        component.save()

        monitoring = BuildingComponentMonitoring(
            building_component=component,
            project=project,
            created_by=project.creation_user,
            updated_by=project.creation_user,
        )
        monitoring.save()
