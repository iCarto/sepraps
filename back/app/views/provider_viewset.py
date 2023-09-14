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
        "area_label": "area",
        "type_label": "type",
        "is_legalized_label": "is_legalized",
    }


class ProviderFilter(filters.FilterSet):
    class Meta(object):
        model = Provider
        fields = ("search",)

    search = filters.CharFilter(method="filter_by_search_text")

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(name__icontains=search_text)


class ProviderViewSet(ModelListAuditViewSet):
    queryset = Provider.objects.all().order_by("name")
    serializer_class = ProviderSerializer
    summary_serializer_class = ProviderSummarySerializer
    filterset_class = ProviderFilter
    filter_backends = [DjangoFilterBackend, ProviderOrderingFilter]
    ordering_fields = ["name", "area_label", "type_label", "is_legalized_label"]
