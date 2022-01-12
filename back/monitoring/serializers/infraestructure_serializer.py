from monitoring.models.infrastructure import Infrastructure
from rest_framework import serializers


class InfraestructureSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=True)
    department_name = serializers.CharField(source="department.name", required=False)
    district_name = serializers.CharField(source="district.name", required=False)
    locality_name = serializers.CharField(source="locality.name", required=False)

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
