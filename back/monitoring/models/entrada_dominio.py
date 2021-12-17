from django.db import models


class EntradaDominio(models.Model):

    CATEGORY_CHOICES = [
        ("tipo_proyecto", "Tipo de Proyecto"),
        ("clase_proyecto", "Clase de Proyecto"),
    ]

    id = models.AutoField(primary_key=True)
    category = models.CharField("Categoria", max_length=20, choices=CATEGORY_CHOICES)
    key = models.CharField("Clave", max_length=50)
    value = models.CharField("Valor", max_length=50)
    ordering = models.IntegerField("Orden", null=True, blank=True)
    parent = models.CharField("Padre", null=True, max_length=30)
    tooltip = models.TextField("Tooltip", null=True, max_length=255)

    class Meta:
        db_table = "dominios"
        verbose_name = "Dominio"
        verbose_name_plural = "Dominios"

    def __str__(self):
        return self.value
