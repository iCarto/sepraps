from django.db import models
from monitoring.models.contact import Contact
from monitoring.models.contact_relationship import ContractorContact


class Contractor(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", max_length=100)
    contractor_type = models.CharField("Tipo de contratista", max_length=50, null=True)
    address = models.TextField("Dirección", max_length=500, null=True)
    phone = models.CharField("Celular", max_length=20, null=True)
    email = models.CharField("E-mail", max_length=255, null=True)
    comments = models.TextField("Observaciones", max_length=500, null=True)
    contacts = models.ManyToManyField(Contact, through=ContractorContact)

    class Meta:
        db_table = "contractor"
        verbose_name = "Contratista"
        verbose_name_plural = "Contratistas"

    def __str__(self):
        return self.name
