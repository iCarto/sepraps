from monitoring.models.provider import Provider
from monitoring.serializers.provider_serializer import ProviderSerializer
from rest_framework import viewsets


class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.select_related(
        "locality", "locality__department", "locality__district"
    )
    serializer_class = ProviderSerializer
