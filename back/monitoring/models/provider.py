from django.db import models


class Provider(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", null=True, max_length=100)

    class Meta:
        db_table = "provider"
        verbose_name = "Prestador"
        verbose_name_plural = "Prestadores"

    def __str__(self):
        return self.name
