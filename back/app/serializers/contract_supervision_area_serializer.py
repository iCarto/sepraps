from rest_framework import serializers

from app.models.contract_supervision_area import ContractSupervisionArea


class ContractSupervisionAreaSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = ContractSupervisionArea
        fields = ("area", "staff")

    area = serializers.CharField(required=False, read_only=True)
