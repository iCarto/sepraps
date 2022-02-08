from monitoring.models.provider import Provider
from monitoring.serializers.locality_serializer import LocalitySerializer
from rest_framework import serializers


class ProviderSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(allow_null=True)
    locality = LocalitySerializer()

    class Meta:
        model = Provider
        fields = ("id", "name", "area", "locality")
