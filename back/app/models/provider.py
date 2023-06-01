from django.db import models

from app.base.models.base_models import BaseEntityModelMixin
from app.models.contact import Contact
from app.models.contact_relationship import ProviderContact
from app.models.location import Locality
from documents.base.base_models import BaseDocumentModel


class Provider(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "provider"
        verbose_name = "Prestador de servicio"
        verbose_name_plural = "Prestadores de servicio"

    name = models.CharField("Nombre", null=True, max_length=100)
    area = models.CharField("Área", max_length=50, null=True)
    locality = models.ForeignKey(
        Locality,
        on_delete=models.PROTECT,
        verbose_name=Locality._meta.verbose_name,  # noqa: WPS437
    )
    contacts = models.ManyToManyField(Contact, through=ProviderContact)
