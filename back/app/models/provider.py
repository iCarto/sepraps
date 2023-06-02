from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

from app.base.models.base_models import BaseEntityModelMixin
from app.models.contact import Contact
from app.models.contact_relationship import ProviderContact
from documents.base.base_models import BaseDocumentModel


class Provider(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "provider"
        verbose_name = "Prestador de servicio"
        verbose_name_plural = "Prestadores de servicio"

    name = models.CharField("Nombre", max_length=100)
    area = models.CharField("Área", max_length=50)
    type = models.CharField("Tipo", max_length=50, null=True, blank=True)
    number_of_members = models.IntegerField("Número de miembros", null=True, blank=True)
    number_of_women = models.IntegerField("Número de mujeres", null=True, blank=True)
    is_legalized = models.BooleanField(null=True, blank=True, default=False)
    legalization_date = models.DateField("Fecha de legalización", null=True, blank=True)
    legal_status = models.CharField(
        "Naturaleza jurídica", max_length=50, null=True, blank=True
    )
    legal_registry_code = models.CharField(
        "Número de personería jurídica / Número de registro",
        max_length=25,
        null=True,
        blank=True,
    )
    contacts = models.ManyToManyField(Contact, through=ProviderContact)


@receiver(pre_save, sender=Provider)
def locality_pre_save(sender, instance, *args, **kwargs):
    if not instance.is_legalized:
        instance.legalization_date = None
        instance.legal_status = ""
        instance.legal_registry_code = ""

    return instance
