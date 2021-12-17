from django.db import models
from monitoring.models.location import Department, District, Locality


class Infrastructure(models.Model):

    id = models.AutoField(primary_key=True)
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
        db_table = "infrastructure"
        verbose_name = "Infraestructura"
        verbose_name_plural = "Infraestructuras"

    def __str__(self):
        return (
            self.locality.name
            + " - "
            + self.district.name
            + " ("
            + self.department.name
            + ")"
        )
