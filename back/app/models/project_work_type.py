from django.core.validators import FileExtensionValidator
from django.db import models


class ProjectWorkType(models.Model):
    class Meta:
        db_table = "project_work_type"
        verbose_name = "Tipo de proyecto"
        verbose_name_plural = "Tipos de proyecto"

    key = models.CharField("Clave", max_length=50, primary_key=True, unique=True)
    value = models.CharField("Valor", max_length=100)
    color = models.CharField("Color", max_length=7)
    config_file = models.FileField(
        "Archivo de configuración",
        upload_to="customization",
        max_length=254,
        validators=[FileExtensionValidator(allowed_extensions=["json"])],
    )

    def __str__(self):
        return self.value
