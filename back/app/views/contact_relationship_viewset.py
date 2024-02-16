from rest_framework import mixins, permissions, viewsets

from app.models.contact_relationship import (
    ContractContact,
    ContractorContact,
    ProviderContact,
)
from app.serializers.contact_relationship_serializer import (
    ContractContactSerializer,
    ContractorContactSerializer,
    ProviderContactSerializer,
)


class ContactRelationshipViewSet(
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = (permissions.DjangoModelPermissions,)


class ContractContactViewSet(ContactRelationshipViewSet):
    queryset = ContractContact.objects.all()
    serializer_class = ContractContactSerializer


class ContractorContactViewSet(ContactRelationshipViewSet):
    queryset = ContractorContact.objects.all()
    serializer_class = ContractorContactSerializer


class ProviderContactViewSet(ContactRelationshipViewSet):
    queryset = ProviderContact.objects.all()
    serializer_class = ProviderContactSerializer
