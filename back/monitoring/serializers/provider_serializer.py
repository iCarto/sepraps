from monitoring.models.location import Locality
from monitoring.models.project import Project
from monitoring.models.provider import Provider
from monitoring.serializers.contact_relationship_serializer import (
    ContactProviderSerializer,
)
from monitoring.serializers.locality_serializer import LocalitySerializer
from rest_framework import serializers


class ProviderSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(allow_null=True, required=False)
    locality = LocalitySerializer()
    project = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=Project.objects.all(), required=False
    )
    contacts = ContactProviderSerializer(
        source="providercontact_set", many=True, required=False
    )

    class Meta:
        model = Provider
        fields = ("id", "name", "area", "locality", "project", "contacts")
        extra_kwargs = {"project": {"write_only": True}}

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
