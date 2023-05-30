from django.db import models
from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from app.serializers.provider_serializer import ProviderSummarySerializer
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from monitoring.views.base_viewsets import ModelListViewSet

from app.models.provider import Provider
from app.serializers.provider_serializer import ProviderSerializer


class ProviderFilter(filters.FilterSet):
    search = filters.CharFilter(method="filter_by_search_text")
    locality = filters.CharFilter(method="filter_by_locality")
    district = filters.CharFilter(method="filter_by_district")
    department = filters.CharFilter(method="filter_by_department")

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(Q(name__icontains=search_text))

    def filter_by_locality(self, queryset, param_name, search_value):
        return queryset.filter(models.Q(locality=search_value))

    def filter_by_district(self, queryset, param_name, search_value):
        return queryset.filter(models.Q(locality__district=search_value))

    def filter_by_department(self, queryset, param_name, search_value):
        return queryset.filter(models.Q(locality__department=search_value))

    class Meta:
        model = Provider
        fields = ("search", "locality")


class ProviderViewSet(ModelListViewSet):
    queryset = Provider.objects.select_related(
        "locality", "locality__department", "locality__district"
    )
    serializer_class = ProviderSerializer
    pagination_class = PageNumberPagination()
    permission_classes = [permissions.DjangoModelPermissions]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProviderFilter

    def perform_create(self, serializer):
        serializer.validated_data["creation_user"] = self.request.user
        return super().perform_create(serializer)

    def get_serializer_class(self):
        if self.action == "list":
            return ProviderSummarySerializer
        return super().get_serializer_class()
