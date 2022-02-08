from monitoring.models.infrastructure import Infrastructure
from monitoring.serializers.locality_serializer import LocalitySerializer
from rest_framework import serializers


class InfraestructureSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    locality = LocalitySerializer()

    class Meta:
        model = Infrastructure
        fields = ("id", "locality", "latitude", "longitude", "altitude")
