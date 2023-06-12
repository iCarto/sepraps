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
    number_of_members = models.IntegerField(
        "Número de miembros de la Comisión Directiva", null=True, blank=True
    )
    number_of_women = models.IntegerField(
        "Número de mujeres de la Comisión Directiva", null=True, blank=True
    )
    is_legalized = models.BooleanField(null=True, blank=True, default=False)
    legalization_date = models.DateField("Fecha de legalización", null=True, blank=True)
    is_provider_contract_signed = models.BooleanField(
        null=True, blank=True, default=False
    )
    legal_status_number = models.CharField(
        "Número de personería jurídica", max_length=20, null=True, blank=True
    )
    local_resolution_number = models.CharField(
        "Número de resolución municipal", max_length=20, null=True, blank=True
    )
    contacts = models.ManyToManyField(Contact, through=ProviderContact)


@receiver(pre_save, sender=Provider)
def provider_pre_save(sender, instance, *args, **kwargs):
    if not instance.is_legalized:
        instance.legalization_date = None
        instance.legal_status_number = ""
        instance.local_resolution_number = ""
    if instance.is_legalized and instance.type == "junta_de_saneamiento":
        instance.local_resolution_number = ""
    if instance.is_legalized and instance.type == "comision_de_agua":
        instance.legal_status_number = ""

    return instance
