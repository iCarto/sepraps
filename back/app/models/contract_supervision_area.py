from django.contrib.postgres.fields import ArrayField
from django.db import models


SUPERVISION_AREA_CHOICES = (
    ("building", "Obras"),
    ("social", "Social"),
    ("environmental", "Ambiental"),
)


class ContractSupervisionArea(models.Model):
    class Meta(object):
        db_table = "contract_supervision_area"
        verbose_name = "Área de supervisión"
        verbose_name_plural = "Áreas de supervisión"

    area = models.CharField("Código", max_length=20, choices=SUPERVISION_AREA_CHOICES)
    staff = ArrayField(models.CharField(max_length=50), null=False)

    contract = models.ForeignKey(
        "ConstructionContract",
        on_delete=models.PROTECT,
        verbose_name="Contrato",
        related_name="supervision_areas",
    )
