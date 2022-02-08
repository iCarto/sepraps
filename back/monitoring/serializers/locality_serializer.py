from monitoring.models.location import Locality
from rest_framework import serializers


class LocalitySerializer(serializers.ModelSerializer):

    code = serializers.CharField()
    locality_name = serializers.CharField(source="name", required=False, read_only=True)
    district = serializers.CharField(source="district.code", required=False)
    district_name = serializers.CharField(
        source="district.name", required=False, read_only=True
    )
    department = serializers.CharField(source="department.code", required=False)
    department_name = serializers.CharField(
        source="department.name", required=False, read_only=True
    )

    class Meta:
        model = Locality
        fields = (
            "code",
            "locality_name",
            "district",
            "district_name",
            "department",
            "department_name",
        )
