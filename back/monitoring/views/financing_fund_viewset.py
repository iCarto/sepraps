from monitoring.models.financing_fund import FinancingFund
from monitoring.serializers.financing_fund_serializer import FinancingFundSerializer
from rest_framework import viewsets


class FinancingFundViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FinancingFund.objects.all()
    serializer_class = FinancingFundSerializer
