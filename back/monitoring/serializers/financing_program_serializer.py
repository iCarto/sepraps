from monitoring.models.financing_program import FinancingProgram
from rest_framework import serializers


class FinancingProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancingProgram
        fields = ("id", "short_name", "name")
