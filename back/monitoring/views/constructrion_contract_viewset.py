from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from monitoring.models.construction_contract import ConstructionContract
from monitoring.models.domain_entry import DomainEntry
from monitoring.models.project_questionnaire_instance import (
    ProjectQuestionnaireInstance,
)
from monitoring.serializers.construction_contract_serializer import (
    ConstructionContractSerializer,
    ConstructionContractShortSerializer,
    ConstructionContractSummarySerializer,
)
from questionnaires import services as questtionnaire_services
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class ConstructionContractFilter(filters.FilterSet):
    status = filters.CharFilter(method="filter_by_status")
    search = filters.CharFilter(method="filter_by_search_text")

    def filter_by_status(self, queryset, name, status):
        if status == "active":
            return queryset.filter(closed=False)

        return queryset

    def filter_by_search_text(self, queryset, name, search_text):

        return queryset.filter(Q(number__icontains=search_text))

    class Meta:
        model = ConstructionContract
        fields = ("search",)


class ConstructionContractViewSet(viewsets.ModelViewSet):
    serializer_class = ConstructionContractSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ConstructionContractFilter

    def get_queryset(self):
        queryset = ConstructionContract.objects.filter(closed=False).order_by(
            "-created_at"
        )
        return self.get_serializer_class().setup_eager_loading(queryset)

    def get_serializer_context(self):
        context = super(ConstructionContractViewSet, self).get_serializer_context()
        context.update({"action": self.action})
        context.update({"domain": DomainEntry.objects.all()})
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
        return super().perform_create(serializer)

    @action(
        detail=True,
        methods=["get"],
        url_path=(
            "questionnaire_instances/(?P<questionnaire_code>\w+)/(?P<field_code>\w+)"
        ),
    )
    def contract_questionnaire_instances_chart_data(
        self, request, questionnaire_code, field_code, pk=None
    ):
        contract = self.get_object()
        contract_project_codes = [project.id for project in contract.projects.all()]
        instances = ProjectQuestionnaireInstance.objects.filter(
            project__in=contract_project_codes, questionnaire__code=questionnaire_code
        ).prefetch_related("questionnaire_instance__values")
        questionnaire_instances = [
            instance.questionnaire_instance for instance in instances
        ]

        return Response(
            questtionnaire_services.get_monthly_questionnaire_instances_dataframe(
                questionnaire_code, field_code, questionnaire_instances
            )
        )
