from monitoring.models.location import Locality
from monitoring.models.project import Project
from monitoring.models.provider import Provider
from monitoring.serializers.locality_serializer import LocalitySerializer
from rest_framework import serializers


class ProviderSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(allow_null=True, required=False)
    locality = LocalitySerializer()
    project = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=Project.objects.all()
    )

    class Meta:
        model = Provider
        fields = ("id", "name", "area", "locality", "project")
        extra_kwargs = {"project": {"write_only": True}}

    def create(self, validated_data):

        locality_data = validated_data.pop("locality")
        locality = Locality.objects.get(pk=locality_data["code"])

        project = validated_data.pop("project")

        provider = Provider.objects.create(**validated_data, locality=locality)

        project.provider = provider
        project.save()

        return provider

    def update(self, instance, validated_data):

        locality_data = validated_data.pop("locality")
        locality = Locality.objects.get(pk=locality_data["code"])
        instance.locality = locality

        project = validated_data.pop("project")

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()

        project.provider = instance
        project.save()

        return instance
