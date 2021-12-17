from django.db import models


class FinancingFund(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.TextField("Nombre", null=True, max_length=100)

    class Meta:
        db_table = "financing_fund"
        verbose_name = "Financiador"
        verbose_name_plural = "Financiadores"

    def __str__(self):
        return self.name
