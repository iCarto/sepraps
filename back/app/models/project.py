from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from app.models.building_component import create_project_building_components
from app.models.connection import create_project_connection
from app.models.infrastructure import Infrastructure
from app.models.location import Locality
from app.models.milestone import create_project_milestones
from app.models.provider import Provider
from app.models.social_component_monitoring import create_project_social_components
from documents.models import MediaNode, create_folder_structure
from questionnaires.models.monthly_questionnaire_instance import (
    MonthlyQuestionnaireInstance,
)
from questionnaires.models.questionnaire import Questionnaire


class Project(models.Model):
    class Meta(object):
        db_table = "project"
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"

    id = models.AutoField(
        primary_key=True
    )  # Keep it, because if we remove this property there is a type change in db to bigint
    code = models.CharField("Código", unique=True, max_length=30)
    description = models.CharField("Descripción", max_length=255)
    init_date = models.DateField("Fecha de inicio")

    main_infrastructure = models.OneToOneField(
        Infrastructure,
        on_delete=models.PROTECT,
        verbose_name=Infrastructure._meta.verbose_name,
    )

    provider = models.ForeignKey(
        Provider,
        on_delete=models.PROTECT,
        verbose_name=Provider._meta.verbose_name,
        null=True,
        related_name="projects",
    )
    linked_localities = models.ManyToManyField(Locality)

    featured_image = models.ForeignKey(
        MediaNode,
        on_delete=models.SET_NULL,
        verbose_name=MediaNode._meta.verbose_name,
        null=True,
        related_name="project_featured_image",
    )
    folder = models.ForeignKey(
        MediaNode,
        on_delete=models.PROTECT,
        verbose_name=MediaNode._meta.verbose_name,
        null=True,
        related_name="project_folder",
    )

    # This field only exists to retrieve questionnaires list for project menu
    # TODO: Explore if there is another solution for this use case
    # TODO(cmartin): remove if we are not using questionnaires any more
    questionnaires = models.ManyToManyField(Questionnaire)
    questionnaires_instances = models.ManyToManyField(
        MonthlyQuestionnaireInstance, through="ProjectQuestionnaireInstance"
    )

    closed = models.BooleanField(blank=False, null=False, default=False)

    creation_user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    created_at = models.DateTimeField("Fecha de creación", null=True, auto_now_add=True)
    updated_at = models.DateTimeField(
        "Fecha de última modificación", null=True, auto_now=True
    )

    @property
    def construction_contract(self):
        contract_project = (
            self.related_contracts.filter(
                contract__services__contains=["ejecucion_de_obra"]
            )
            .order_by("contract__execution_signature_date", "contract")
            .first()
        )
        if contract_project:
            return contract_project.contract
        return None

    @property
    def related_contracts_list(self):
        return [
            contract_project.contract
            for contract_project in self.related_contracts.order_by(
                "contract__execution_signature_date", "contract"
            ).all()
        ]

    @property
    def bm_total_expected_amount(self):
        building_monitorings = self.project_building_monitorings.all()

        if not building_monitorings:
            return 0

        expected_amounts = [
            bm.expected_amount
            for bm in building_monitorings
            if bm.expected_amount is not None
        ]

        return sum(expected_amounts)

    def create_structure_data(self, data):
        if not self.folder:
            # if there is no folder, the project is new, so default structure for
            # folder, questionnaires and milestones is created
            classtype = type(self).__name__
            root_folder = create_folder_structure(
                f"{self.code}",
                f"{classtype.lower()}/{self.code}",
                data.get("folders", []),
            )
            self.folder = root_folder

            self.save()

            create_project_milestones(self, data.get("milestones", []))

    def create_components_data(self, data):
        create_project_building_components(self, data.get("building_components", {}))
        create_project_social_components(self, data.get("social_components", {}))

    def __str__(self):
        return self.code


@receiver(post_save, sender=Project)
def post_create(sender, instance, created, *args, **kwargs):
    """Create project folder structure and project milestones from template."""
    if not created:
        return
    create_project_connection(instance)


def get_code_for_new_project():
    """Returns a new code with format YYYY-type-000
    where 'YYYY' is current year and '000' is the number
    order for projects created this year.
    """
    year = timezone.now().year

    try:
        last_code = (
            Project.objects.filter(created_at__year=year).latest("created_at").code
        )
        new_code = (str(int(last_code[-3:]) + 1)).zfill(3)
    except ObjectDoesNotExist:
        new_code = "001"

    # TODO: change AP for project type code
    return str(year) + "-AP-" + new_code


class ProjectProgress(models.Model):
    class Meta:
        managed = False
        db_table = "project_progress"

    project = models.OneToOneField(
        Project, on_delete=models.DO_NOTHING, primary_key=True, related_name="progress"
    )
    financial_progress_percentage = models.DecimalField(
        "Porcentaje de avance financiero", max_digits=5, decimal_places=2, null=True
    )
    physical_progress_percentage = models.DecimalField(
        "Porcentaje de avance físico", max_digits=5, decimal_places=2, null=True
    )
    number_of_participants = models.IntegerField("Número de participantes", null=True)
    percentage_of_women = models.DecimalField(
        "Porcentaje de mujeres", max_digits=5, decimal_places=2, null=True
    )
    number_of_planned_connections = models.IntegerField(
        "Número de conexiones previstas", null=True
    )
    number_of_actual_connections = models.IntegerField(
        "Número de conexiones ejecutadas", null=True
    )
    percentage_of_connections = models.DecimalField(
        "Porcentaje de conexiones", max_digits=5, decimal_places=2, null=True
    )

    def __str__(self):
        return f"{self.__class__.__name__}: {self.id}"
