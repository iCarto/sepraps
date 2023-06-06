from domains.models import DomainEntry
from domains.serializers import DomainEntrySerializer
from rest_framework import permissions, viewsets


class DomainEntryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DomainEntry.objects.all().order_by("category", "ordering", "value")
    serializer_class = DomainEntrySerializer
    permission_classes = [permissions.DjangoModelPermissions]
