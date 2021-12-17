from monitoring.models.entrada_dominio import EntradaDominio
from monitoring.serializers.entrada_dominio_serializer import EntradaDominioSerializer
from rest_framework import viewsets


class EntradaDominioViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EntradaDominio.objects.all().order_by("category", "ordering", "value")
    serializer_class = EntradaDominioSerializer
