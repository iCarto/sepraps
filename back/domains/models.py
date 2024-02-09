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
    phases_domain = ("etapas", "Etapas")
    service_type = ("tipo_servicio", "Tipo de servicio del contrato")
    product_status = ("estado_producto", "Estado producto")
    deliverable_status = ("estado_entregable", "Estado entregable")
    total_amount_type = ("tipo_monto", "Tipo de monto total")
    product_frequency_type = ("frecuencia_producto", "Tipo de frecuencia de pago")
    payment_criteria_type = ("criterio_pago", "Tipo de criterio de pago")
    execution_status_type = ("estado_ejecucion", "Tipo de estado de ejecución")
    quality_status_type = ("estado_cualitativo", "Tipo de estado cualitativo")
    target_population_type = ("poblacion_meta", "Tipo de población meta")
    training_method_type = (
        "modalidad_capacitacion",
        "Tipo de modalidad de capacitación",
    )
    amendment_type = ("amendment_type", "Tipo de adenda")
    material_letrinas = ("material_letrinas", "Material de las letrinas")
    tipo_aljibe = ("tipo_aljibe", "Tipo de aljibe")
    tipo_laguna = ("tipo_laguna", "Tipo de laguna")
    tipo_tanque = ("tipo_tanque", "Tipo de tanque")
    sistema_disposicion = ("sistema_disposicion", "Sistema de disposición")
    tipo_caseta = ("tipo_caseta", "Tipo de caseta")
    tipo_canheria = ("tipo_canheria", "Tipo de cañería")
    material_caseta = ("material_caseta", "Material de la caseta")
    tipo_energia = ("tipo_energia", "Tipo de energía")
    ubicacion_aljibe = ("ubicacion_aljibe", "Ubicación del aljibe")


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
