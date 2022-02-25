from monitoring.models.location import Locality
from monitoring.models.project import Project
from monitoring.models.provider import Provider
from monitoring.serializers.contact_serializer import ContactSerializer
from monitoring.serializers.locality_serializer import LocalitySerializer
from rest_framework import serializers


class ProviderSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(allow_null=True, required=False)
    locality = serializers.PrimaryKeyRelatedField(queryset=Locality.objects.all())
    project = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=Project.objects.all(), required=False
    )
    contacts = ContactSerializer(many=True, required=False)

    class Meta:
        model = Provider
        fields = ("id", "name", "area", "locality", "project", "contacts")
        extra_kwargs = {"project": {"write_only": True}}

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "locality" in response:
            response["locality"] = LocalitySerializer(instance.locality).data
        return response

    def create(self, validated_data):

        contacts_data = validated_data.pop("contacts", None)

        project = validated_data.pop("project", None)

        provider = Provider.objects.create(**validated_data)

        provider.contacts.set(self.fields["contacts"].update([], contacts_data))

        if project:
            project.provider = provider
            project.save()

        return provider

    def update(self, instance, validated_data):

        # calling to ContactListSerializer.update() we can make all modifications
        # for contacts inside the provider
        instance.contacts.set(
            self.fields["contacts"].update(
                instance.contacts.all(), validated_data.pop("contacts", None)
            )
        )

        project = validated_data.pop("project", None)

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()

        if project:
            project.provider = instance
            project.save()

        return instance
