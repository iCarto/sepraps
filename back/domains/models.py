from django.db import models


class DomainCategoryChoices(models.TextChoices):
    project_type = ("project_type", "Tipo de proyecto")
    project_class = ("project_class", "Clase de proyecto")
    contact_post = ("contact_post", "Cargo del contacto")
    area_prestador = ("area_prestador", "Área del prestador")
    contractor_type = ("contractor_type", "Tipo de contratista")
    tipo_prestador = ("tipo_prestador", "Tipo de prestador")
    naturaleza_juridica = ("naturaleza_juridica", "Naturaleza jurídica")


class DomainEntry(models.Model):
    class Meta(object):
        db_table = "dominios"
        verbose_name = "Dominio"
        verbose_name_plural = "Dominios"

    id = models.AutoField(primary_key=True)
    category = models.CharField(
        "Categoria", max_length=50, choices=DomainCategoryChoices.choices
    )
    key = models.CharField("Clave", max_length=50)
    value = models.CharField("Valor", max_length=100)
    ordering = models.IntegerField("Orden", null=True, blank=True)
    parent = models.CharField("Padre", null=True, max_length=30)
    tooltip = models.TextField("Tooltip", null=True, max_length=255)

    def __str__(self):
        return self.value
