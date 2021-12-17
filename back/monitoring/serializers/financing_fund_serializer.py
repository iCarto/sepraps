from monitoring.models.financing_fund import FinancingFund
from rest_framework import serializers


class FinancingFundSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancingFund
        fields = ("id", "name")
