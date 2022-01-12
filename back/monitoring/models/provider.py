from django.db import models
from monitoring.models.location import Department, District, Locality


class Provider(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", null=True, max_length=100)
    area = models.CharField("Área", max_length=50, null=True)
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, verbose_name=Department._meta.verbose_name
    )
    district = models.ForeignKey(
        District, on_delete=models.PROTECT, verbose_name=District._meta.verbose_name
    )
    locality = models.ForeignKey(
        Locality, on_delete=models.PROTECT, verbose_name=Locality._meta.verbose_name
    )

    class Meta:
        db_table = "provider"
        verbose_name = "Prestador"
        verbose_name_plural = "Prestadores"

    def __str__(self):
        return self.name
