from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend

from app.base.views.base_viewsets import ModelListAuditViewSet
from app.base.views.filters import MappedOrderingFilter
from app.models.field_report import FieldReport
from app.serializers.field_report_serializer import (
    FieldReportSerializer,
    FieldReportSummarySerializer,
)


class FieldReportOrderingFilter(MappedOrderingFilter):
    ordering_field_mappping = {}


class FieldReportFilter(filters.FilterSet):
    class Meta(object):
        model = FieldReport
        fields = ("search",)

    search = filters.CharFilter(method="filter_by_search_text")

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(
            Q(name__icontains=search_text) | Q(code__icontains=search_text)
        )


class FieldReportViewSet(ModelListAuditViewSet):
    queryset = FieldReport.objects.all()
    serializer_class = FieldReportSerializer
    summary_serializer_class = FieldReportSummarySerializer
    filterset_class = FieldReportFilter
    filter_backends = [DjangoFilterBackend, FieldReportOrderingFilter]
    ordering_fields = ["name", "code", "date", "reporting_person"]
