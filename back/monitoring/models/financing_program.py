from django.db import models
from monitoring.models.financing_fund import FinancingFund


class FinancingProgram(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", null=True, max_length=100)
    financing_fund = models.ForeignKey(
        FinancingFund,
        on_delete=models.PROTECT,
        verbose_name=FinancingFund._meta.verbose_name,
    )

    class Meta:
        db_table = "financing_program"
        verbose_name = "Programa de financiación"
        verbose_name_plural = "Programas de financiación"

    def __str__(self):
        return self.name
