from rest_framework import serializers

from app.models.construction_contract import ConstructionContract
from app.models.contact import Contact
from app.models.contract_supervision_area import ContractSupervisionArea
from app.serializers.construction_contract_serializer import (
    ConstructionContractSummarySerializer,
)
from app.serializers.contact_serializer import ContactSerializer


class ContractSupervisionAreaSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = ContractSupervisionArea
        fields = ("id", "code", "supervisor", "supervision_contract")

    id = serializers.IntegerField(required=False)
    code = serializers.CharField(required=False, read_only=True)
    supervisor = serializers.PrimaryKeyRelatedField(
        required=False, allow_null=True, queryset=Contact.objects.all()
    )
    supervision_contract = serializers.PrimaryKeyRelatedField(
        required=False, allow_null=True, queryset=ConstructionContract.objects.all()
    )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "supervisor" in response:
            response["supervisor"] = (
                ContactSerializer(instance.supervisor, context=self.context).data
                if instance.supervisor is not None
                else None
            )
        if "supervision_contract" in response:
            response["supervision_contract"] = (
                ConstructionContractSummarySerializer(
                    instance.supervision_contract, context=self.context
                ).data
                if instance.supervision_contract is not None
                else None
            )
        return response
