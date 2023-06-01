from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseSummarySerializer,
)
from app.models.location import Locality
from app.models.project import Project
from app.models.provider import Provider
from app.serializers.contact_relationship_serializer import ContactProviderSerializer
from app.serializers.locality_serializer import LocalitySerializer


class ProviderSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Provider
        fields = BaseModelSerializer.Meta.fields + (
            "name",
            "area",
            "locality",
            "project",
            "contacts",
        )
        extra_kwargs = {"project": {"write_only": True}}

    locality = LocalitySerializer()
    project = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=Project.objects.all(), allow_null=True, required=False
    )
    contacts = ContactProviderSerializer(
        source="providercontact_set", many=True, required=False
    )

    def create(self, validated_data):
        project = validated_data.pop("project", None)
        contacts = validated_data.pop("providercontact_set", None)

        locality_data = validated_data.pop("locality", None)
        locality = None
        if locality_data.get("code"):
            locality = Locality.objects.get(pk=locality_data["code"])
        else:
            locality = self.fields["locality"].create(locality_data)

        provider = Provider.objects.create(locality=locality, **validated_data)

        # calling to ContactProviderListSerializer.update() we can make all modifications
        # for contacts inside the provider
        if contacts:
            self.fields["contacts"].update(provider, [], contacts)

        if project:
            project.provider = provider
            project.save()

        return provider

    def update(self, instance, validated_data):
        project = validated_data.pop("project", None)

        # calling to ContactProviderListSerializer.update() we can make all modifications
        # for contacts inside the provider
        contacts = validated_data.pop("providercontact_set", None)
        if contacts:
            self.fields["contacts"].update(instance, instance.contacts.all(), contacts)

        locality_data = validated_data.pop("locality", None)
        locality = None
        if locality_data.get("code"):
            locality = Locality.objects.get(pk=locality_data["code"])
        else:
            locality = self.fields["locality"].create(locality_data)
        instance.locality = locality

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()

        if project:
            project.provider = instance
            project.save()

        return instance


class ProviderSummarySerializer(BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = Provider
        fields = BaseSummarySerializer.Meta.fields + ("name", "area", "locality")

    locality = LocalitySerializer()
