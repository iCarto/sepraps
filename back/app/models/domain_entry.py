from django.db import models


class DomainEntry(models.Model):
    CATEGORY_CHOICES = [
        ("project_type", "Tipo de Proyecto"),
        ("project_class", "Clase de Proyecto"),
        ("contact_post", "Cargo del contacto"),
        ("provider_area", "Área"),
        ("contact_post", "Cargos"),
        ("contactor_type", "Tipo de Contratista"),
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


def dominio_get_value(searched_key, cached_domain=None):
    """Try to replace in future to work only for cached results"""
    if cached_domain:
        for domain_entry in cached_domain:
            if domain_entry.key == searched_key:
                return domain_entry.value
    result = DomainEntry.objects.filter(key=searched_key)
    if result:
        return result[0].value
    return searched_key
