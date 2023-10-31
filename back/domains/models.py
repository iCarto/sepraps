from django.db import models


class DomainCategoryChoices(models.TextChoices):
    project_type = ("project_type", "Tipo de proyecto")
    project_class = ("project_class", "Clase de proyecto")
    contact_post = ("contact_post", "Cargo del contacto")
    contractor_type = ("contractor_type", "Tipo de contratista")
    provider_area = ("area_prestador", "Área del prestador")
    provider_type = ("tipo_prestador", "Tipo de prestador")
    yes_no_domain = ("dominiosino", "Sí/No")
    gender_domain = ("gender", "Género")
    service_type = ("tipo_servicio", "Tipo de servicio del contrato")
    payment_status = ("estado_pago", "Estado pago")
    product_status = ("estado_entregable", "Estado entregable")
    total_amount_type = ("tipo_monto", "Tipo de monto total")
    payment_frequency_type = ("frecuencia_pago", "Tipo de frecuencia de pago")
    payment_criteria_type = ("criterio_pago", "Tipo de criterio de pago")


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
