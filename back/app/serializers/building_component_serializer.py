from rest_framework import serializers

from app.base.serializers.base_serializers import BaseEntityModelSerializer
from app.models.building_component import BuildingComponent
from app.models.building_component_value import BuildingComponentValue


class BuildingComponentSerializer(BaseEntityModelSerializer):
    class Meta(BaseEntityModelSerializer.Meta):
        model = BuildingComponent
        fields = (
            *BaseEntityModelSerializer.Meta.fields,
            "code",
            "code_label",
            "name",
            "technical_properties",
            "validation_properties",
        )
        extra_kwargs = {"code": {"read_only": True, "required": False}}  # noqa: RUF012

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

    def get_properties(self, obj, property_name):
        cs_properties = getattr(obj, property_name, {})

        cs_values = obj.building_component_values.all()
        for cs_value in cs_values:
            cs_property = next(
                (key for key in cs_properties if key == cs_value.code), None
            )
            if cs_property:
                cs_properties[cs_property]["value"] = cs_value.value
        return cs_properties

    def update_properties(self, instance, cs_properties):
        cs_values = instance.building_component_values.all()

        for cs_property_code, cs_property_data in cs_properties.items():
            cs_value = next(
                (
                    cs_value
                    for cs_value in cs_values
                    if cs_value.code == cs_property_code
                ),
                None,
            )
            if not cs_value:
                cs_value = BuildingComponentValue(
                    code=cs_property_code, value=None, building_component=instance
                )
            cs_value.value = cs_property_data.get("value")
            cs_value.save()

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["technical_properties"] = self.get_properties(
            instance, "technical_properties"
        )
        response["validation_properties"] = self.get_properties(
            instance, "validation_properties"
        )
        return response

    def update(self, instance, validated_data):
        self.update_properties(
            instance, validated_data.pop("technical_properties", None)
        )
        self.update_properties(
            instance, validated_data.pop("validation_properties", None)
        )

        return super().update(instance, validated_data)
