from django.contrib.auth import get_user_model
from django.db import models

from questionnaires.models.questionnaire import Questionnaire


class MonthlyQuestionnaireInstance(models.Model):
    id = models.AutoField(primary_key=True)
    questionnaire = models.ForeignKey(
        Questionnaire,
        on_delete=models.PROTECT,
        verbose_name=Questionnaire._meta.verbose_name,
        null=True,
    )
    month = models.IntegerField("Mes")
    year = models.IntegerField("Año")
    comments = models.TextField("Observaciones", max_length=500, null=True)
    extended = models.BooleanField(blank=False, null=False, default=False)

    creation_user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    created_at = models.DateTimeField("Fecha de creación", null=True, auto_now_add=True)

    class Meta:
        db_table = "monthly_questionnaire_instance"
        verbose_name = "Instancia de cuestionario mensual"
        verbose_name_plural = "Instancias de cuestionarios mensuales"

    def __str__(self):
        return f"({str(self.id)}) - {str(self.month)}/{str(self.year)}"
