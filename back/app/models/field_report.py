from django.contrib.postgres.fields import ArrayField
from django.db import models

from app.base.models.base_models import BaseEntityModelMixin
from documents.base.base_models import BaseDocumentModel
from documents.folder_utils import sanitize_field_value
from documents.models import MediaNode, create_folder_structure


class FieldReport(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "field_report"
        verbose_name = "Informe de viaje"
        verbose_name_plural = "Informes de viaje"

    name = models.CharField("Nombre", max_length=200)
    code = models.CharField("Número de memorandum", max_length=50)
    date = models.DateField("Fecha del informe")
    visit_date_start = models.DateField("Fecha de inicio de la intervención", null=True)
    visit_date_end = models.DateField(
        "Fecha de culminación de la intervención", null=True
    )
    # TO-DO: Reporting person can be more than one (as seen in sample reports); same for reported_person (not yet added here)
    reporting_person = models.CharField("Autor/a del informe", max_length=200)
    reported_persons = ArrayField(
        models.CharField("Autor/a del/de la responsable de aprobación", max_length=200)
    )
    participant_persons = ArrayField(
        models.CharField("Participantes en la intervención", max_length=200)
    )

    report_comments_start = models.TextField("Introducción al informe", null=True)
    report_comments_end = models.TextField("Cierre del informe", null=True)
    goals = ArrayField(models.TextField("Objetivo"), null=True)

    folder = models.ForeignKey(
        MediaNode,
        on_delete=models.PROTECT,
        verbose_name="Directorio",
        null=True,
        related_name="folder+",
    )

    def post_create(self, sender, created, *args, **kwargs):
        if created:
            classtype = type(self).__name__
            field_value = sanitize_field_value(self.code)
            root_folder = create_folder_structure(
                "{0}".format(field_value),
                "{0}/{1}".format(classtype.lower(), field_value),
                [],
            )
            self.folder = root_folder

            self.save()
