from monitoring.models.location import Locality
from monitoring.serializers.locality_serializer import LocalitySerializer
from rest_framework import viewsets


class LocalityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Locality.objects.prefetch_related("department", "district")
    serializer_class = LocalitySerializer