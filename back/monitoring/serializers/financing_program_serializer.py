from monitoring.models.financing_program import FinancingProgram
from monitoring.serializers.financing_fund_serializer import FinancingFundSerializer
from rest_framework import serializers


class FinancingProgramSerializer(serializers.ModelSerializer):
    financing_funds = FinancingFundSerializer(many=True, read_only=True)

    class Meta:
        model = FinancingProgram
        fields = ("id", "short_name", "name", "financing_funds")
