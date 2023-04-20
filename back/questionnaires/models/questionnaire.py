from django.db import models


class Questionnaire(models.Model):
    QUESTIONNAIRE_CATEGORY_CHOICES = [("monthly", "Mensual")]

    code = models.CharField("Código", primary_key=True, max_length=50)
    version = models.IntegerField("Versión")
    name = models.CharField("Nombre", max_length=100)
    category = models.CharField(
        "Categoría", max_length=20, choices=QUESTIONNAIRE_CATEGORY_CHOICES
    )
    fields = models.JSONField("Campos")

    class Meta(object):
        db_table = "questionnaire"
        verbose_name = "Cuestionario"
        verbose_name_plural = "Cuestionarios"

    def __str__(self):
        return self.code
