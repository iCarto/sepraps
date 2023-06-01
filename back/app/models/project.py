import json
import os

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from app.models.construction_contract import ConstructionContract
from app.models.infrastructure import Infrastructure
from app.models.location import Locality
from app.models.provider import Provider
from documents.folder_utils import create_folder
from documents.models import MediaNode
from questionnaires.models.monthly_questionnaire_instance import (
    MonthlyQuestionnaireInstance,
)
from questionnaires.models.questionnaire import Questionnaire


class Project(models.Model):
    id = models.AutoField(primary_key=True)
    code = models.CharField("Código", unique=True, max_length=30)
    project_type = models.CharField("Tipo de proyecto", max_length=50, null=True)
    project_class = models.CharField("Clase de proyecto", max_length=50, null=True)
    description = models.CharField("Descripción", max_length=255)
    init_date = models.DateField("Fecha de inicio")

    main_infrastructure = models.OneToOneField(
        Infrastructure,
        on_delete=models.PROTECT,
        verbose_name=Infrastructure._meta.verbose_name,
    )

    construction_contract = models.ForeignKey(
        ConstructionContract,
        on_delete=models.PROTECT,
        verbose_name=ConstructionContract._meta.verbose_name,
        null=True,
        related_name="projects",
    )
    provider = models.ForeignKey(
        Provider,
        on_delete=models.PROTECT,
        verbose_name=Provider._meta.verbose_name,
        null=True,
        related_name="project",
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
    # TODO Explore if there is another solution for this use case
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

    class Meta(object):
        db_table = "project"
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"

    def __str__(self):
        return self.code


@receiver(post_save, sender=Project)
def post_create(sender, instance, created, *args, **kwargs):
    """
    Create project folder structure and project milestones from template
    """
    from app.models.milestone import create_project_milestones

    if not created:
        return

    data = {}
    data_path = os.path.join(
        settings.BASE_DIR, "app", "data", "project", f"{instance.project_type}.json"
    )
    with open(data_path) as f:
        data = json.load(f)
        # settings.MONITORING_TEMPLATES_FOLDER
        # + "/project/"
        # + instance.project_type
        # + ".json",

    root_folder = create_folder(
        instance, field="code", created=True, children_data=data.get("folders", [])
    )
    instance.folder = root_folder

    instance.questionnaires.set(
        Questionnaire.objects.filter(
            code__in=list(
                map(
                    lambda questionnaire: questionnaire.get("code"),
                    data.get("questionnaires", []),
                )
            )
        )
    )

    instance.save()

    create_project_milestones(instance, data.get("milestones", []))


def get_code_for_new_project():
    """
    Returns a new code with format YYYY-type-000
    where 'YYYY' is current year and '000' is the number
    order for projects created this year
    """

    year = timezone.now().year

    try:
        last_code = (
            Project.objects.filter(created_at__year=year).latest("created_at").code
        )
        new_code = (str(int(last_code[-3:]) + 1)).zfill(3)
    except ObjectDoesNotExist:
        new_code = "001"

    # TODO change AP for project type code
    return str(year) + "-AP-" + new_code
