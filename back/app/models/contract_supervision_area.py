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

    code = models.CharField("Código", max_length=20, choices=SUPERVISION_AREA_CHOICES)

    supervisor = models.ForeignKey(
        "Contact", null=True, on_delete=models.PROTECT, related_name="supervisor+"
    )
    supervision_contract = models.ForeignKey(
        "ConstructionContract",
        on_delete=models.PROTECT,
        verbose_name="Contrato de supervisión",
        null=True,
        related_name="supervised_contracts",
    )

    contract = models.ForeignKey(
        "ConstructionContract",
        on_delete=models.PROTECT,
        verbose_name="Contrato",
        null=True,
        related_name="contract_supervision_areas",
    )
