from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
)
from app.models.contract_service import ContractService
from domains.mixins import BaseDomainMixin


class ContractServiceSerializer(BaseDomainMixin, BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = ContractService
        fields = (
            *BaseModelWithFolderSerializer.Meta.fields,
            "code",
            "name",
            "labels",
            "properties",
        )
        extra_kwargs = {
            "code": {"read_only": True, "required": False},
            "name": {"read_only": True, "required": False},
            "labels": {"read_only": True, "required": False},
        }

    properties = serializers.JSONField()

    def get_properties(self, obj):
        cs_properties = obj.properties
        cs_values = obj.contract_service_values.all()
        for cs_value in cs_values:
            cs_property = next(key for key in cs_properties if key == cs_value.code)
            cs_properties[cs_property]["value"] = cs_value.value
        return cs_properties

    def update_properties(self, instance, cs_properties):
        cs_values = instance.contract_service_values.all()

        for cs_property in cs_properties:
            cs_value = next(
                cs_value for cs_value in cs_values if cs_value.code == cs_property
            )
            cs_value.value = cs_properties[cs_property]["value"]
            cs_value.save()

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "properties" in response:
            response["properties"] = self.get_properties(instance)

        return response

    def update(self, instance, validated_data):
        cs_properties = validated_data.pop("properties", None)
        self.update_properties(instance, cs_properties)

        return instance
