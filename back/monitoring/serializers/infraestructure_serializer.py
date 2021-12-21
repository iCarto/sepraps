from monitoring.models.infrastructure import Infrastructure
from rest_framework import serializers


class InfraestructureSerializer(serializers.ModelSerializer):

    department_name = serializers.CharField(source="department.name")
    district_name = serializers.CharField(source="district.name")
    locality_name = serializers.CharField(source="locality.name")

    class Meta:
        model = Infrastructure
        fields = (
            "id",
            "department",
            "department_name",
            "district",
            "district_name",
            "locality",
            "locality_name",
            "latitude",
            "longitude",
            "altitude",
        )
