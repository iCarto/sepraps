from app.models.financing_fund import FinancingFund
from app.serializers.financing_fund_serializer import FinancingFundSerializer
from rest_framework import permissions, viewsets


class FinancingFundViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FinancingFund.objects.all()
    serializer_class = FinancingFundSerializer
    permission_classes = [permissions.DjangoModelPermissions]
