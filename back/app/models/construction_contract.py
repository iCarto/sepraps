import json
import os

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from django.db import models
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from app.models.contact import Contact
from app.models.contact_relationship import ContractContact
from app.models.contract_project import ContractProject
from app.models.contract_service import ContractService
from app.models.contract_supervision_area import ContractSupervisionArea
from app.models.contractor import Contractor
from app.models.financing_program import FinancingProgram


class ConstructionContract(models.Model):
    class Meta(object):
        db_table = "construction_contract"
        verbose_name = "Contrato de obras"
        verbose_name_plural = "Contratos de obras"

    id = models.AutoField(primary_key=True)
    number = models.CharField("Nombre", max_length=50)
    comments = models.TextField("Observaciones", max_length=500, null=True)
    services = ArrayField(models.CharField(max_length=50), null=False)

    total_amount_type = models.CharField(
        "Tipo de monto total", max_length=20, null=False
    )
    product_frequency_type = models.CharField(
        "Tipo de frecuencia de producto", max_length=20, null=False
    )
    payment_criteria_type = models.CharField(
        "Tipo de criterio de producto", max_length=20, null=False
    )

    bid_request_number = models.CharField("Número de llamado", max_length=50)
    bid_request_id = models.CharField("Identificador de llamado", max_length=50)
    bid_request_lot_number = models.TextField(
        "Número de lote", max_length=500, null=True
    )
    bid_request_date = models.DateField("Fecha de llamado")
    bid_request_budget_min = models.DecimalField(
        "Monto total mínimo", max_digits=20, decimal_places=2, null=True
    )
    bid_request_budget = models.DecimalField(
        "Monto total (máximo)", max_digits=20, decimal_places=2
    )

    awarding_budget_min = models.DecimalField(
        "Monto total de adjudicación mínimo", max_digits=20, decimal_places=2, null=True
    )
    awarding_budget = models.DecimalField(
        "Monto total de adjudicación (máximo)",
        max_digits=20,
        decimal_places=2,
        null=True,
    )
    awarding_percentage_drop = models.DecimalField(
        "Porcentaje de baja de adjudicación", max_digits=5, decimal_places=2, null=True
    )
    awarding_date = models.DateField("Fecha de adjudicación", null=True)
    awarding_professional_liability_insurance = models.CharField(
        "Seguro de responsabilidad profesional", max_length=20, null=True
    )
    awarding_liability_insurance = models.CharField(
        "Seguro de responsabilidad civil", max_length=20, null=True
    )
    awarding_accident_insurance = models.CharField(
        "Seguro de accidentes", max_length=20, null=True
    )

    execution_signature_date = models.DateField(
        "Fecha de firma del contrato", null=True
    )
    execution_start_date = models.DateField("Fecha de inicio del contrato", null=True)
    expected_execution_period = models.IntegerField(
        "Plazo previsto de ejecución", null=True
    )
    warranty_end_date = models.DateField("Fin del periodo de garantía", null=True)

    closed = models.BooleanField(blank=False, null=False, default=False)
    created_at = models.DateTimeField("Fecha de creación", null=True, auto_now_add=True)
    updated_at = models.DateTimeField(
        "Fecha de última modificación", null=True, auto_now=True
    )
    creation_user = models.ForeignKey(
        get_user_model(), on_delete=models.PROTECT, related_name="creation_user+"
    )
    updated_by = models.ForeignKey(
        get_user_model(), on_delete=models.PROTECT, related_name="updated_by+"
    )

    projects = models.ManyToManyField("Project", through=ContractProject)
    financing_program = models.ForeignKey(
        FinancingProgram,
        on_delete=models.PROTECT,
        verbose_name=FinancingProgram._meta.verbose_name,
        null=True,
    )
    contractor = models.ForeignKey(
        Contractor,
        on_delete=models.PROTECT,
        verbose_name=Contractor._meta.verbose_name,
        null=True,
        related_name="contract",
    )
    contacts = models.ManyToManyField(Contact, through=ContractContact)

    @property
    def related_contracts(self):
        projects = self.projects.all()
        return (
            ConstructionContract.objects.filter(projects__in=projects)
            .exclude(pk=self.id)
            .distinct()
            .order_by("id")
        )

    @property
    def total_awarding_budget(self):
        amendments = self.contract_amendments.all()
        extra_amounts = [
            amendment.extra_amount for amendment in amendments if amendment.extra_amount
        ]
        if self.awarding_budget:
            return self.awarding_budget + sum(extra_amounts) if extra_amounts else None
        return None

    @property
    def total_expected_execution_period(self):
        amendments = self.contract_amendments.all()
        extra_periods = [
            amendment.extra_period for amendment in amendments if amendment.extra_period
        ]
        if self.expected_execution_period:
            return (
                self.expected_execution_period + sum(extra_periods)
                if extra_periods
                else None
            )
        return None

    def __str__(self):
        return self.number


@receiver(pre_save, sender=ConstructionContract)
def contract_pre_save(sender, instance, *args, **kwargs):
    if instance and instance.total_amount_type != "maximo_minimo":
        instance.bid_request_budget_min = None
        instance.awarding_budget_min = None
    try:
        instance._old_services = ConstructionContract.objects.get(
            pk=instance.pk
        ).services
    except ConstructionContract.DoesNotExist:
        instance._old_services = []

    return instance


@receiver(post_save, sender=ConstructionContract)
def contract_post_save(sender, instance, created, *args, **kwargs):
    """Manage services and supervision area relationships."""
    contract_services_to_delete = list(
        set(instance._old_services) - set(instance.services)
    )
    contract_services_to_create = list(
        set(instance.services) - set(instance._old_services)
    )
    if contract_services_to_delete or contract_services_to_create:
        update_contract_services(
            instance, contract_services_to_delete, contract_services_to_create
        )
        update_supervision_areas(instance)


def update_contract_services(
    contract, contract_services_to_delete, contract_services_to_create
):
    for service in contract_services_to_delete:
        ContractService.objects.filter(code=service, contract=contract).delete()

    for service in contract_services_to_create:
        data = get_service_data(service)
        contract_service = ContractService(
            code=data["code"],
            name=data["name"],
            supervision_areas=data["supervision_areas"],
            properties=data["properties"],
            contract=contract,
            created_by=contract.updated_by,
            updated_by=contract.updated_by,
        )
        contract_service.save()


def update_supervision_areas(contract):
    contract.supervision_areas.all().delete()

    service_areas_to_store = {}
    for service in contract.services:
        data = get_service_data(service)
        service_areas = data.get("supervision_areas", [])
        for area in service_areas:
            service_areas_to_store[area] = list(
                set(
                    data.get("staff", {}).get(area, [])
                    + service_areas_to_store.get(area, [])
                )
            )

    for area_code, staff_values in service_areas_to_store.items():
        contract_supervision_area = ContractSupervisionArea(
            area=area_code, contract=contract, staff=staff_values
        )
        contract_supervision_area.save()


def get_service_data(service):
    data_path = os.path.join(
        settings.BASE_DIR, "app", "data", "service", f"{service}.json"
    )
    with open(data_path) as f:
        return json.load(f)
