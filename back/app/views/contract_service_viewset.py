from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.contract_service import ContractService
from app.serializers.contract_service_serializer import ContractServiceSerializer


class ContractServiceViewSet(ModelListAuditViewSet):
    queryset = ContractService.objects.all()
    serializer_class = ContractServiceSerializer
