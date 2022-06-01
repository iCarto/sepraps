from django.contrib.auth import get_user_model
from django.db import models
from questionnaires.models.monthly_questionnaire_instance import (
    MonthlyQuestionnaireInstance,
)


QUESTIONNAIRE_DATATYPE_CHOICES = [
    ("text", "Texto"),
    ("integer", "Entero"),
    ("decimal2", "Decimal"),
]


class MonthlyQuestionnaireValue(models.Model):

    id = models.AutoField(primary_key=True)
    questionnaire_instance = models.ForeignKey(
        MonthlyQuestionnaireInstance,
        on_delete=models.CASCADE,
        verbose_name=MonthlyQuestionnaireInstance._meta.verbose_name,
        null=True,
        related_name="values",
    )
    code = models.CharField("Código", max_length=50)
    datatype = models.CharField(
        "Tipo de dato", max_length=20, choices=QUESTIONNAIRE_DATATYPE_CHOICES
    )
    label = models.CharField("Etiqueta", max_length=100)
    expected_value = models.CharField("Valor", null=True, max_length=255)
    value = models.CharField("Valor", null=True, max_length=255)

    class Meta:
        db_table = "monthly_questionnaire_value"
        verbose_name = "Dato de cuestionario mensual"
        verbose_name_plural = "Datos de cuestionarios mensuales"

    def __str__(self):
        return self.label + " - " + self.value
