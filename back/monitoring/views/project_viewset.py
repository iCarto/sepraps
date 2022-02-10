from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from monitoring.models.project import Project
from monitoring.serializers.project_serializer import (
    ProjectSerializer,
    ProjectShortSerializer,
    ProjectSummarySerializer,
)
from rest_framework import viewsets


class ProjectFilter(filters.FilterSet):
    status = filters.CharFilter(method="filter_by_status")

    def filter_by_status(self, queryset, name, status):
        if status == "active":
            return queryset.filter(closed=False)

        return queryset

    class Meta:
        model = Project
        fields = ("status",)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.select_related(
        "main_infrastructure",
        "main_infrastructure__locality",
        "main_infrastructure__locality__department",
        "main_infrastructure__locality__district",
        "provider",
        "provider__locality",
        "provider__locality__department",
        "provider__locality__district",
        "construction_contract",
        "financing_fund",
        "financing_program",
    ).prefetch_related("contacts")
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter

    def get_queryset(self):
        if self.action == "list":
            template = self.request.query_params.get("template")
            if template == "short":
                return Project.objects.all()
            return Project.objects.select_related(
                "main_infrastructure",
                "main_infrastructure__locality",
                "main_infrastructure__locality__department",
                "main_infrastructure__locality__district",
                "provider",
                "financing_fund",
                "financing_program",
            )
        return Project.objects.select_related(
            "main_infrastructure",
            "main_infrastructure__locality",
            "main_infrastructure__locality__department",
            "main_infrastructure__locality__district",
            "provider",
            "provider__locality",
            "provider__locality__department",
            "provider__locality__district",
            "construction_contract",
            "financing_fund",
            "financing_program",
        ).prefetch_related("linked_localities", "contacts", "provider__contacts")

    def get_serializer_class(self):
        if self.action == "list":
            template = self.request.query_params.get("template")
            if template == "short":
                return ProjectShortSerializer
            return ProjectSummarySerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.validated_data["creation_user"] = self.request.user
        return super().perform_create(serializer)
