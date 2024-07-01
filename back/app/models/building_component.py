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
    code_label = models.CharField("Etiqueta de código", max_length=255)
    name = models.CharField("Nombre", max_length=255)
    technical_properties = models.JSONField("Datos técnicos", null=True)
    validation_properties = models.JSONField("Datos de validación", null=True)


@receiver(post_save, sender=BuildingComponent)
def building_component_post_save(sender, instance, created, *args, **kwargs):
    if created:
        technical_properties = instance.technical_properties
        validation_properties = instance.validation_properties

        for technical_property in technical_properties:
            building_component_value = BuildingComponentValue(
                code=technical_property, value=None, building_component=instance
            )
            building_component_value.save()

        for validation_property in validation_properties:
            building_component_value = BuildingComponentValue(
                code=validation_property, value=None, building_component=instance
            )
            building_component_value.save()


def create_project_building_components(project, components):
    for index, component_code in enumerate(components):
        component_config = components[component_code]
        print(index, component_code, component_config)
        component = BuildingComponent(
            code=component_code,
            code_label=component_config.get("name"),
            name=component_config.get("name"),
            technical_properties=component_config.get("technical_properties"),
            validation_properties=component_config.get("validation_properties"),
            created_by=project.creation_user,
            updated_by=project.creation_user,
        )
        component.save()

        monitoring = BuildingComponentMonitoring(
            building_component=component,
            project=project,
            project_order=index + 1,
            created_by=project.creation_user,
            updated_by=project.creation_user,
        )
        monitoring.save()
