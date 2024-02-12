from rest_framework import serializers

from app.base.serializers.base_serializers import BaseEntityModelSerializer
from app.models.building_component import BuildingComponent
from app.models.building_component_value import BuildingComponentValue


class BuildingComponentSerializer(BaseEntityModelSerializer):
    class Meta(BaseEntityModelSerializer.Meta):
        model = BuildingComponent
        fields = BaseEntityModelSerializer.Meta.fields + (
            "code",
            "code_label",
            "name",
            "technical_properties",
            "validation_properties",
        )
        extra_kwargs = {"code": {"read_only": True, "required": False}}

    technical_properties = serializers.JSONField(required=False)
    validation_properties = serializers.JSONField(required=False)

    def get_extra_kwargs(self):
        extra_kwargs = super().get_extra_kwargs()
        if self.instance:
            kwargs = extra_kwargs.get("code", {})
            kwargs["read_only"] = True
            extra_kwargs["code"] = kwargs
        else:
            kwargs = extra_kwargs.get("code", {})
            kwargs["read_only"] = False
            extra_kwargs["code"] = kwargs

        return extra_kwargs

    def get_properties(self, obj, property_type):
        if property_type == "technical":
            cs_properties = obj.technical_properties
        elif property_type == "validation":
            cs_properties = obj.validation_properties
        else:
            cs_properties = {}
        cs_values = obj.building_component_values.all()
        for cs_value in cs_values:
            cs_property = [key for key in cs_properties if key == cs_value.code]
            if cs_property:
                cs_property = cs_property[0]
                cs_properties[cs_property]["value"] = cs_value.value
        return cs_properties

    def update_properties(self, instance, cs_properties, property_type):
        cs_values = instance.building_component_values.all()

        for cs_property_code, cs_property_data in cs_properties.items():
            cs_value_found = [
                cs_value for cs_value in cs_values if cs_value.code == cs_property_code
            ]
            if not cs_value_found:
                cs_value = BuildingComponentValue(
                    code=cs_property_code, value=None, building_component=instance
                )
            else:
                cs_value = cs_value_found[0]
            cs_value.value = cs_property_data["value"]
            cs_value.save()

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["technical_properties"] = self.get_properties(instance, "technical")
        response["validation_properties"] = self.get_properties(instance, "validation")
        return response

    def update(self, instance, validated_data):
        technical_properties = validated_data.pop("technical_properties", None)
        validation_properties = validated_data.pop("validation_properties", None)

        self.update_properties(instance, technical_properties, "technical")
        self.update_properties(instance, validation_properties, "validation")

        return super().update(instance, validated_data)
