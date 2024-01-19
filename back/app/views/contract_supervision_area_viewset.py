from rest_framework import viewsets

from app.models.contract_supervision_area import ContractSupervisionArea
from app.serializers.contract_supervision_area_serializer import (
    ContractSupervisionAreaSerializer,
)


class ContractSupervisionAreaViewSet(viewsets.ModelViewSet):
    queryset = ContractSupervisionArea.objects.all()
    serializer_class = ContractSupervisionAreaSerializer
