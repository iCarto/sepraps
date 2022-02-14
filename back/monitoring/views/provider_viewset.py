from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from monitoring.models.provider import Provider
from monitoring.serializers.provider_serializer import ProviderSerializer
from rest_framework import viewsets


class ProviderFilter(filters.FilterSet):
    search = filters.CharFilter(method="filter_by_search_text")

    def filter_by_search_text(self, queryset, name, search_text):

        return queryset.filter(Q(name__icontains=search_text))

    class Meta:
        model = Provider
        fields = ("search",)


class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.select_related(
        "locality", "locality__department", "locality__district"
    )
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProviderFilter
    serializer_class = ProviderSerializer
