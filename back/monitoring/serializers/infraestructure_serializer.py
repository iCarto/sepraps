from monitoring.models.infrastructure import Infrastructure
from monitoring.models.location import Locality
from monitoring.serializers.locality_serializer import LocalitySerializer
from rest_framework import serializers


class InfraestructureSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    locality = serializers.PrimaryKeyRelatedField(
        queryset=Locality.objects.all(), required=False
    )

    class Meta:
        model = Infrastructure
        fields = ("id", "locality", "latitude", "longitude", "altitude")

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "locality" in response:
            response["locality"] = LocalitySerializer(instance.locality).data
        return response
