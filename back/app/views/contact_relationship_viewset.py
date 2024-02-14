from rest_framework import mixins, permissions, viewsets

from app.models.contact_relationship import ContractContact
from app.serializers.contact_relationship_serializer import ContractContactSerializer


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
