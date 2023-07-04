from django.db import models

from django.contrib.postgres.fields import ArrayField

from app.base.models.base_models import BaseEntityModelMixin
from documents.base.base_models import BaseDocumentModel


class FieldReport(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "field_report"
        verbose_name = "Informe de viaje"
        verbose_name_plural = "Informes de viaje"

    name = models.CharField("Nombre", max_length=100)
    code = models.CharField("Número de memorandum", max_length=50)
    date = models.DateField("Fecha del informe")
    visit_date_start = models.DateField("Fecha de inicio de la intervención", null=True)
    visit_date_end = models.DateField(
        "Fecha de culminación de la intervención", null=True
    )
    # TO-DO: Reporting person can be more than one (as seen in sample reports); same for reported_person (not yet added here)
    reporting_person_name = models.CharField("Autor/a del informe", max_length=100)
    reporting_person_role = models.CharField(
        "Cargo del/de la autor/a", max_length=100, null=True
    )
    reporting_person_department = models.CharField(
        "Departamento del/de la autor/a", max_length=100, null=True
    )
    report_comments_start = models.TextField(
        "Introducción al informe", max_length=500, null=True
    )
    report_comments_end = models.TextField(
        "Cierre del informe", max_length=500, null=True
    )
    goals = ArrayField(models.TextField("Objetivo", max_length=300), null=True)
