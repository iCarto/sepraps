from monitoring.models.provider import Provider
from monitoring.serializers.provider_serializer import ProviderSerializer
from rest_framework import viewsets


class ProviderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Provider.objects.prefetch_related("department", "district", "locality")
    serializer_class = ProviderSerializer
