from django.db import models

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from app.models.comment import Comment
from app.models.project import Project
from app.util import format_decimal
from documents.base.base_models import BaseDocumentModel


# TO-DO: Harcoded nº of people per household
NUMBER_OF_PEOPLE_PER_HOUSEHOLD = 5


class Connection(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "connection"
        verbose_name = "Conexión"
        verbose_name_plural = "Conexiones"

    objects = ActiveManager()

    number_of_households = models.IntegerField("Número de viviendas", null=True)
    number_of_existing_connections = models.IntegerField(
        "Número de conexiones existentes", null=True
    )
    number_of_planned_connections = models.IntegerField(
        "Número de conexiones previstas", null=True
    )
    number_of_actual_connections = models.IntegerField(
        "Número de conexiones reales", null=True
    )
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        verbose_name=Project._meta.verbose_name,
        related_name="connections",
    )
    comments = models.ManyToManyField(Comment)

    @property
    def population(self):
        if not self.number_of_households:
            return None
        return self.number_of_households * NUMBER_OF_PEOPLE_PER_HOUSEHOLD

    @property
    def connected_households_percentage(self):
        number_of_households = self.number_of_households
        number_of_actual_connections = self.number_of_actual_connections

        if not number_of_households or not number_of_actual_connections:
            return 0
        return format_decimal(
            (number_of_actual_connections / number_of_households) * 100
        )

    @property
    def coverage(self):
        if not self.number_of_actual_connections:
            return None
        return self.number_of_actual_connections * NUMBER_OF_PEOPLE_PER_HOUSEHOLD

    def __str__(self):
        return self.id


def create_project_connection(project):
    connection = Connection(
        project=project,
        created_by=project.creation_user,
        updated_by=project.creation_user,
    )
    connection.save()
