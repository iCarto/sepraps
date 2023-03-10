from monitoring.models.domain_entry import DomainEntry
from monitoring.serializers.domain_entry_serializer import DomainEntrySerializer
from rest_framework import permissions, viewsets


class DomainEntryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DomainEntry.objects.all().order_by("category", "ordering", "value")
    serializer_class = DomainEntrySerializer
    permission_classes = [permissions.DjangoModelPermissions]
