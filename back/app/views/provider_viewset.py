from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend

from app.base.views.base_viewsets import ModelListAuditViewSet
from app.base.views.filters import MappedOrderingFilter
from app.models.provider import Provider
from app.serializers.provider_serializer import (
    ProviderSerializer,
    ProviderSummarySerializer,
)


class ProviderOrderingFilter(MappedOrderingFilter):
    ordering_field_mappping = {
        "locality.name": "locality__name",
        "locality.district_name": "locality__district__name",
        "locality.department_name": "locality__department__name",
    }


class ProviderFilter(filters.FilterSet):
    class Meta(object):
        model = Provider
        fields = ("search", "locality")

    search = filters.CharFilter(method="filter_by_search_text")
    locality = filters.CharFilter(method="filter_by_locality")
    district = filters.CharFilter(method="filter_by_district")
    department = filters.CharFilter(method="filter_by_department")

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(name__icontains=search_text)

    def filter_by_locality(self, queryset, param_name, search_value):
        return queryset.filter(locality=search_value)

    def filter_by_district(self, queryset, param_name, search_value):
        return queryset.filter(locality__district=search_value)

    def filter_by_department(self, queryset, param_name, search_value):
        return queryset.filter(locality__department=search_value)


class ProviderViewSet(ModelListAuditViewSet):
    queryset = Provider.objects.select_related(
        "locality", "locality__department", "locality__district"
    ).order_by("name")
    serializer_class = ProviderSerializer
    summary_serializer_class = ProviderSummarySerializer
    filterset_class = ProviderFilter
    filter_backends = [DjangoFilterBackend, ProviderOrderingFilter]
    ordering_fields = [
        "locality.name",
        "locality.district_name",
        "locality.department_name",
    ]
