from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices
from rest_framework import serializers

from app.base.serializers.base_serializers import BaseModelSerializer
from app.models.construction_contract import ConstructionContract
from app.models.contractor import Contractor
from app.models.social_component_training import SocialComponentTraining
from app.serializers.construction_contract_serializer import (
    ConstructionContractShortSerializer,
)
from app.serializers.contractor_serializer import ContractorSummarySerializer


class SocialComponentTrainingSerializer(BaseDomainMixin, BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = SocialComponentTraining
        fields = BaseModelSerializer.Meta.fields + (
            "start_date",
            "end_date",
            "target_population",
            "method",
            "number_of_women",
            "number_of_men",
            "number_of_participants",
            "woman_percentage",
            "men_percentage",
            "number_of_hours",
            "number_of_digital_materials",
            "number_of_printed_materials",
            "contract",
            "contractor",
        )

    target_population = serializers.ListField(child=serializers.CharField())

    domain_fields = [
        BaseDomainField(
            "target_population", DomainCategoryChoices.target_population_type, many=True
        ),
        BaseDomainField("method", DomainCategoryChoices.training_method_type),
    ]

    contract = serializers.PrimaryKeyRelatedField(
        required=False, allow_null=True, queryset=ConstructionContract.objects.all()
    )
    contractor = serializers.PrimaryKeyRelatedField(
        required=False, allow_null=True, queryset=Contractor.objects.all()
    )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "contract" in response:
            response["contract"] = (
                ConstructionContractShortSerializer(
                    instance.contract, context=self.context
                ).data
                if instance.contract is not None
                else None
            )

        if "contractor" in response:
            response["contractor"] = (
                ContractorSummarySerializer(
                    instance.contractor, context=self.context
                ).data
                if instance.contractor is not None
                else None
            )

        return response
