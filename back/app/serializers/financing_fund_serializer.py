from rest_framework import serializers

from app.models.financing_fund import FinancingFund


class FinancingFundSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = FinancingFund
        fields = ("id", "short_name", "name")
