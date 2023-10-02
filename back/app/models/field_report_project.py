from django.contrib.postgres.fields import ArrayField
from django.db import models

from app.base.models.base_models import BaseEntityModelMixin
from app.models.field_report import FieldReport
from app.models.project import Project
from documents.base.base_models import BaseDocumentModel
from documents.models import Folder


class FieldReportProject(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "field_report_project"
        verbose_name = "Proyecto en informe de viaje"
        verbose_name_plural = "Proyectos en informe de viaje"

    history = models.TextField("Antecedentes", null=True)
    agreements = ArrayField(models.TextField("Objetivo"), null=True)

    field_report = models.ForeignKey(
        FieldReport,
        on_delete=models.CASCADE,
        verbose_name=FieldReport._meta.verbose_name,
        null=True,
        related_name="field_report_projects",
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.PROTECT,
        verbose_name=Project._meta.verbose_name,
        null=True,
        related_name="project",
    )

    def post_create(self, sender, created, *args, **kwargs):
        if created:
            classtype = type(self).__name__
            folder = Folder(
                media_type="FOLDER",
                media_name="{0}".format(self.project.code),
                storage_path="{0}/{1}/{2}".format(
                    self.field_report.folder.storage_path,
                    classtype.lower(),
                    self.project.code,
                ),
                parent=self.field_report.folder,
                creation_user=self.created_by,
            )
            folder.save()

            self.folder = folder
            self.save()
