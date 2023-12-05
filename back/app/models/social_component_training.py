from django.contrib.postgres.fields import ArrayField
from django.db import models

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from app.models.construction_contract import ConstructionContract
from app.models.contractor import Contractor
from app.models.social_component_monitoring import SocialComponentMonitoring
from app.util import format_decimal
from documents.base.base_models import BaseDocumentModel


class SocialComponentTraining(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "social_component_training"
        verbose_name = "Formación de componente social"
        verbose_name_plural = "Formaciones de componente social"

    objects = ActiveManager()

    start_date = models.DateField("Fecha de inicio", null=True)
    end_date = models.DateField("Fecha de fin", null=True)

    target_population = ArrayField(
        models.CharField("Población meta", max_length=50), null=True
    )
    method = models.CharField("Modalidad", max_length=50, null=True)

    number_of_women = models.IntegerField("Número de mujeres", null=True)
    number_of_men = models.IntegerField("Número de hombres", null=True)
    number_of_hours = models.IntegerField("Número de horas", null=True)
    number_of_digital_materials = models.IntegerField(
        "Número de materiales digitales entregados", null=True
    )
    number_of_printed_materials = models.IntegerField(
        "Número de materiales impresos entregados", null=True
    )

    social_component_monitoring = models.ForeignKey(
        SocialComponentMonitoring,
        on_delete=models.CASCADE,
        related_name="social_component_monitoring_trainings",
    )
    contract = models.ForeignKey(
        ConstructionContract,
        on_delete=models.CASCADE,
        related_name="contract_social_trainings",
        null=True,
    )
    contractor = models.ForeignKey(
        Contractor,
        on_delete=models.CASCADE,
        related_name="contractor_social_trainings",
        null=True,
    )

    @property
    def number_of_participants(self):
        if not self.number_of_women and not self.number_of_men:
            return None
        return (self.number_of_women or 0) + (self.number_of_men or 0)

    @property
    def woman_percentage(self):
        number_of_participants = self.number_of_participants
        if not self.number_of_women or not number_of_participants:
            return 0
        return format_decimal((self.number_of_women / number_of_participants) * 100)

    @property
    def men_percentage(self):
        number_of_participants = self.number_of_participants
        if not self.number_of_men or not number_of_participants:
            return 0
        return format_decimal((self.number_of_men / number_of_participants) * 100)
