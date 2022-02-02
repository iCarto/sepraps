from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.utils import timezone
from monitoring.models.construction_contract import ConstructionContract
from monitoring.models.contact import Contact
from monitoring.models.financing_fund import FinancingFund
from monitoring.models.financing_program import FinancingProgram
from monitoring.models.infrastructure import Infrastructure
from monitoring.models.location import Locality
from monitoring.models.provider import Provider


class Project(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", max_length=255)
    code = models.CharField("Código", unique=True, max_length=30)
    project_type = models.CharField("Tipo de proyecto", max_length=50, null=True)
    project_class = models.CharField("Clase de proyecto", max_length=50, null=True)
    init_date = models.DateField("Fecha de inicio")

    main_infrastructure = models.OneToOneField(
        Infrastructure,
        on_delete=models.PROTECT,
        verbose_name=Infrastructure._meta.verbose_name,
    )

    financing_fund = models.ForeignKey(
        FinancingFund,
        on_delete=models.PROTECT,
        verbose_name=FinancingFund._meta.verbose_name,
        null=True,
    )
    financing_program = models.ForeignKey(
        FinancingProgram,
        on_delete=models.PROTECT,
        verbose_name=FinancingProgram._meta.verbose_name,
        null=True,
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
    contacts = models.ManyToManyField(Contact)
    closed = models.BooleanField(blank=False, null=False, default=False)

    creation_user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    created_at = models.DateTimeField("Fecha de creación", null=True, auto_now_add=True)
    updated_at = models.DateTimeField(
        "Fecha de última modificación", null=True, auto_now=True
    )

    class Meta:
        db_table = "project"
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"

    def __str__(self):
        return self.name


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
        new_code = "000"

    # TODO change AP for project type code
    return str(year) + "-AP-" + new_code
