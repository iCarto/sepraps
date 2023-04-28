from django.contrib.auth import get_user_model
from django.db import models

from app.models.contact import Contact
from app.models.contact_relationship import ProviderContact
from app.models.location import Locality


class Provider(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", null=True, max_length=100)
    area = models.CharField("Área", max_length=50, null=True)
    locality = models.ForeignKey(
        Locality, on_delete=models.PROTECT, verbose_name=Locality._meta.verbose_name
    )
    contacts = models.ManyToManyField(Contact, through=ProviderContact)

    creation_user = models.ForeignKey(
        get_user_model(), on_delete=models.PROTECT, null=True
    )
    created_at = models.DateTimeField("Fecha de creación", null=True, auto_now_add=True)
    updated_at = models.DateTimeField(
        "Fecha de última modificación", null=True, auto_now=True
    )

    class Meta:
        db_table = "provider"
        verbose_name = "Prestador"
        verbose_name_plural = "Prestadores"

    def __str__(self):
        return self.name
