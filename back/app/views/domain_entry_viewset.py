from rest_framework import permissions, viewsets

from app.models.domain_entry import DomainEntry
from app.serializers.domain_entry_serializer import DomainEntrySerializer


class DomainEntryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DomainEntry.objects.all().order_by("category", "ordering", "value")
    serializer_class = DomainEntrySerializer
    permission_classes = [permissions.DjangoModelPermissions]
