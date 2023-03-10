from django.db import models
from monitoring.models.contact import Contact
from monitoring.models.contact_relationship import ProviderContact
from monitoring.models.location import Locality


class Provider(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", null=True, max_length=100)
    area = models.CharField("Área", max_length=50, null=True)
    locality = models.ForeignKey(
        Locality, on_delete=models.PROTECT, verbose_name=Locality._meta.verbose_name
    )
    contacts = models.ManyToManyField(Contact, through=ProviderContact)

    class Meta:
        db_table = "provider"
        verbose_name = "Prestador"
        verbose_name_plural = "Prestadores"

    def __str__(self):
        return self.name
