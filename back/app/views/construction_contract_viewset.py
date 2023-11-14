from django.db import models
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from app.base.views.base_viewsets import ModelListViewSet
from app.models.construction_contract import ConstructionContract
from app.models.contract_service import ContractService
from app.models.contract_supervision_area import ContractSupervisionArea
from app.models.payment import Payment
from app.serializers.construction_contract_serializer import (
    ConstructionContractSerializer,
    ConstructionContractShortSerializer,
    ConstructionContractSummarySerializer,
)
from app.serializers.contract_service_serializer import ContractServiceSerializer
from app.serializers.contract_supervision_area_serializer import (
    ContractSupervisionAreaSerializer,
)
from app.serializers.payment_serializer import PaymentSummarySerializer
from app.serializers.project_serializer import ProjectSummarySerializer
from users.constants import GROUP_EDICION, GROUP_GESTION


class ConstructionContractFilter(filters.FilterSet):
    class Meta(object):
        model = ConstructionContract
        fields = ("search",)

    status = filters.CharFilter(method="filter_by_status")
    search = filters.CharFilter(method="filter_by_search_text")
    last_modified_items = filters.CharFilter(method="filter_by_last_modified_items")
    financing_fund = filters.CharFilter(method="filter_by_financing_fund")
    financing_program = filters.CharFilter(method="filter_by_financing_program")
    contractor = filters.CharFilter(method="filter_by_contractor")
    awarding_date_min = filters.DateFilter(method="filter_by_awarding_date_min")
    awarding_date_max = filters.DateFilter(method="filter_by_awarding_date_max")

    def filter_by_status(self, queryset, name, status):
        if status == "active":
            return queryset.filter(closed=False)

        return queryset

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(models.Q(number__icontains=search_text))

    def filter_by_last_modified_items(self, queryset, name, last_modified_items):
        limit = int(last_modified_items)
        return queryset.filter(closed=False).order_by("-updated_at")[:limit]

    def filter_by_financing_fund(self, queryset, param_name, search_value):
        return queryset.filter(
            models.Q(financing_program__financing_funds__in=[int(search_value)])
        )

    def filter_by_financing_program(self, queryset, param_name, search_value):
        return queryset.filter(models.Q(financing_program=search_value))

    def filter_by_contractor(self, queryset, param_name, search_value):
        return queryset.filter(models.Q(contractor=search_value))

    def filter_by_awarding_date_min(self, queryset, name, awarding_date_min):
        return queryset.filter(awarding_date__gte=awarding_date_min)

    def filter_by_awarding_date_max(self, queryset, name, awarding_date_max):
        return queryset.filter(awarding_date__lte=awarding_date_max)


class ConstructionContractViewSet(ModelListViewSet):
    serializer_class = ConstructionContractSerializer
    permission_classes = [permissions.DjangoModelPermissions]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ConstructionContractFilter

    def get_queryset(self):
        queryset = ConstructionContract.objects.filter(closed=False).order_by(
            "-created_at"
        )
        if self.request.user.belongs_to([GROUP_GESTION, GROUP_EDICION]):
            queryset = queryset.filter(
                models.Q(constructioncontractcontact__contact__user=self.request.user)
                | models.Q(creation_user=self.request.user)
            ).distinct()
        return self.get_serializer_class().setup_eager_loading(queryset)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"action": self.action})
        return context

    def get_serializer_class(self):
        if self.action == "list":
            template = self.request.query_params.get("template")
            if template == "short":
                return ConstructionContractShortSerializer
            return ConstructionContractSummarySerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.validated_data["creation_user"] = self.request.user
        serializer.validated_data["updated_by"] = self.request.user
        return super().perform_create(serializer)

    def perform_update(self, serializer):
        serializer.validated_data["updated_by"] = self.request.user
        return super().perform_create(serializer)

    @action(
        methods=["GET"], detail=True, url_path="payments", url_name="contract_payments"
    )
    def get_contract_payments(self, request, pk):
        return Response(
            PaymentSummarySerializer(
                Payment.objects.filter(contract=pk).order_by("id"), many=True
            ).data
        )

    @action(
        methods=["GET"], detail=True, url_path="projects", url_name="contract_projects"
    )
    def get_contract_projects(self, request, pk):
        contract = self.get_object()
        projects = []
        if contract.is_supervision_contract:
            supervision_areas = ContractSupervisionArea.objects.filter(
                supervision_contract=contract
            )
            projects_result = [
                list(supervised_contract.contract.projects.all())
                for supervised_contract in supervision_areas
            ]

            projects = [item for sublist in projects_result for item in sublist]  # flat

        else:
            projects = contract.projects
        return Response(
            ProjectSummarySerializer(
                projects, many=True, context={"request": request}
            ).data
        )

    @action(
        methods=["GET"], detail=True, url_path="services", url_name="contract_services"
    )
    def get_contract_services(self, request, pk):
        return Response(
            ContractServiceSerializer(
                ContractService.objects.filter(contract=pk).order_by("id"), many=True
            ).data
        )

    @action(
        methods=["GET"],
        detail=True,
        url_path="supervisionareas/(?P<code>[^/.]+)",
        url_name="contract_supervision_areas",
    )
    def get_contract_supervision_areas(self, request, code, pk):
        print("code", code)
        return Response(
            ContractSupervisionAreaSerializer(
                ContractSupervisionArea.objects.filter(code=code, contract=pk).first()
            ).data
        )
