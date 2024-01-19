from rest_framework import permissions, viewsets

from domains.models import DomainEntry
from domains.serializers import DomainEntrySerializer


class DomainEntryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DomainEntry.objects.all().order_by("category", "ordering", "value")
    serializer_class = DomainEntrySerializer
    permission_classes = [permissions.DjangoModelPermissions]
