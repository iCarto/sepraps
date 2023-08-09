from django.db import models
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from domains.models import DomainEntry
from rest_framework.decorators import action
from rest_framework.response import Response

from app.base.views.base_viewsets import ModelListAuditViewSet
from app.base.views.filters import MappedOrderingFilter
from app.models.field_report import FieldReport
from app.models.field_report_project import FieldReportProject
from app.serializers.field_report_serializer import (
    FieldReportSerializer,
    FieldReportSummarySerializer,
)


class FieldReportOrderingFilter(MappedOrderingFilter):
    ordering_field_mappping = {}


class FieldReportFilter(filters.FilterSet):
    class Meta(object):
        model = FieldReport
        fields = ("search", "project")

    search = filters.CharFilter(method="filter_by_search_text")
    project = filters.NumberFilter(method="filter_by_project_text")

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(
            models.Q(name__icontains=search_text)
            | models.Q(code__icontains=search_text)
        )

    def filter_by_project_text(self, queryset, name, project_id):
        return queryset.filter(field_report_projects__project=project_id)


class FieldReportViewSet(ModelListAuditViewSet):
    queryset = FieldReport.objects.all()
    serializer_class = FieldReportSerializer
    summary_serializer_class = FieldReportSummarySerializer
    filterset_class = FieldReportFilter
    filter_backends = [DjangoFilterBackend, FieldReportOrderingFilter]
    ordering_fields = ["name", "code", "date", "reporting_person"]

    @action(
        methods=["GET"],
        detail=True,
        url_path="project/(?P<project_id>[^/.]+)",
        url_name="field_report_for_project",
    )
    def get_project_field_reports(self, request, pk, project_id):
        field_report = FieldReport.objects.prefetch_related(
            "created_by",
            "updated_by",
            models.Prefetch(
                "field_report_projects",
                queryset=FieldReportProject.objects.filter(project=int(project_id))
                .prefetch_related("field_report_project_activities")
                .select_related("project", "project__construction_contract"),
            ),
        ).get(pk=pk)
        return Response(
            self.get_serializer_class()(
                field_report,
                context={"request": request, "domain": DomainEntry.objects.all()},
            ).data
        )
