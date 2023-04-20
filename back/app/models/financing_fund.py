from django.db import models


class FinancingFund(models.Model):
    id = models.AutoField(primary_key=True)
    short_name = models.CharField("Nombre corto", max_length=30)
    name = models.CharField("Nombre", max_length=100)

    class Meta(object):
        db_table = "financing_fund"
        verbose_name = "Financiador"
        verbose_name_plural = "Financiadores"

    def __str__(self):
        return self.name
