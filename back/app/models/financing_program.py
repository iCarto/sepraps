from django.db import models

from app.models.financing_fund import FinancingFund


class FinancingProgram(models.Model):
    id = models.AutoField(primary_key=True)
    short_name = models.CharField("Nombre corto", max_length=30)
    name = models.CharField("Nombre", max_length=100)
    financing_funds = models.ManyToManyField(
        FinancingFund, verbose_name=FinancingFund._meta.verbose_name
    )
    closed = models.BooleanField(blank=False, null=False, default=False)

    class Meta:
        db_table = "financing_program"
        verbose_name = "Programa de financiación"
        verbose_name_plural = "Programas de financiación"

    def __str__(self):
        return self.name
