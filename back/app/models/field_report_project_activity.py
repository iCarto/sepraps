from django.db import models

from app.base.models.base_models import BaseEntityModelMixin
from app.models.field_report_project import FieldReportProject
from documents.base.base_models import BaseDocumentModel
from documents.models import Folder, MediaNode


class FieldReportProjectActivity(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "field_report_project_activity"
        verbose_name = "Actividad de proyecto en informe de viaje"
        verbose_name_plural = "Actividades de proyecto en informe de viaje"

    title = models.TextField("Título")
    date = models.DateField("Fecha del informe")
    notes = models.TextField("Notas", null=True)
    field_report_project = models.ForeignKey(
        FieldReportProject,
        on_delete=models.CASCADE,
        verbose_name=FieldReportProject._meta.verbose_name,
        null=True,
        related_name="field_report_project_activities",
    )

    image1 = models.ForeignKey(
        MediaNode,
        on_delete=models.SET_NULL,
        verbose_name="Imagen 1",
        null=True,
        related_name="image1+",
    )
    image2 = models.ForeignKey(
        MediaNode,
        on_delete=models.SET_NULL,
        verbose_name="Imagen 2",
        null=True,
        related_name="image2+",
    )
    image3 = models.ForeignKey(
        MediaNode,
        on_delete=models.SET_NULL,
        verbose_name="Imagen 3",
        null=True,
        related_name="image3+",
    )
    image4 = models.ForeignKey(
        MediaNode,
        on_delete=models.SET_NULL,
        verbose_name="Imagen 4",
        null=True,
        related_name="image4+",
    )

    def post_create(self, sender, created, *args, **kwargs):
        if created:
            folder = Folder(
                media_type="FOLDER",
                media_name="FieldReportProjectActivity_{0}".format(self.id),
                storage_path="{0}/fieldreportprojectactivity/{1}".format(
                    self.field_report_project.folder.storage_path, self.id
                ),
                parent=self.field_report_project.folder,
                creation_user=self.created_by,
            )
            folder.save()

            self.folder = folder
            self.save()
