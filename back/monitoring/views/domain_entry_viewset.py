from monitoring.models.domain_entry import DomainEntry
from monitoring.serializers.domain_entry_serializer import DomainEntrySerializer
from rest_framework import viewsets


class DomainEntryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DomainEntry.objects.all().order_by("category", "ordering", "value")
    serializer_class = DomainEntrySerializer
