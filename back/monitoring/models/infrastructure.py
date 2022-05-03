from django.db import models
from monitoring.models.location import Locality


class Infrastructure(models.Model):

    id = models.AutoField(primary_key=True)
    locality = models.ForeignKey(
        Locality,
        on_delete=models.PROTECT,
        verbose_name=Locality._meta.verbose_name,
        null=True,
    )

    # TODO: Review management of geo fields
    latitude = models.DecimalField(max_digits=8, decimal_places=5)
    longitude = models.DecimalField(max_digits=8, decimal_places=5)
    altitude = models.IntegerField(null=True)

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
