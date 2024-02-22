from django.db import models


class BuildingComponentValue(models.Model):
    class Meta(object):
        db_table = "building_component_value"

    code = models.CharField("Código", max_length=50)
    value = models.TextField("Valor", max_length=255, null=True)

    building_component = models.ForeignKey(
        "BuildingComponent",
        on_delete=models.CASCADE,
        related_name="building_component_values",
    )
