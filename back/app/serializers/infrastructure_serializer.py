from rest_framework import serializers

from app.models.infrastructure import Infrastructure
from app.models.location import Locality
from app.serializers.locality_serializer import LocalitySerializer


class InfrastructureSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    locality = serializers.PrimaryKeyRelatedField(
        queryset=Locality.objects.all(), required=False
    )
    altitude = serializers.IntegerField(allow_null=True)

    class Meta(object):
        model = Infrastructure
        fields = ("id", "locality", "latitude", "longitude", "altitude")

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "locality" in response:
            response["locality"] = LocalitySerializer(instance.locality).data
        return response
