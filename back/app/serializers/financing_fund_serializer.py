from app.models.financing_fund import FinancingFund
from rest_framework import serializers


class FinancingFundSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancingFund
        fields = ("id", "short_name", "name")
