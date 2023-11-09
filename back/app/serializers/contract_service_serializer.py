from domains.mixins import BaseDomainMixin
from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
)
from app.models.contract_service import ContractService


class ContractServiceSerializer(BaseDomainMixin, BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = ContractService
        fields = BaseModelWithFolderSerializer.Meta.fields + (
            "code",
            "name",
            "properties",
        )
        code = {"code": {"read_only": True}, "name": {"read_only": True}}

    properties = serializers.SerializerMethodField()

    def get_properties(self, obj):  # noqa: WPS615
        cs_properties = obj.properties
        cs_values = obj.contract_service_values or []
        for cs_value in cs_values.all():
            cs_property = [key for key in cs_properties if key == cs_value.code][0]
            cs_properties[cs_property]["value"] = cs_value.value
        return cs_properties
