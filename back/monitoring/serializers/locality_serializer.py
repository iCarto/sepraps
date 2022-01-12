from monitoring.models.location import Locality
from rest_framework import serializers


class LocalitySerializer(serializers.ModelSerializer):

    department = serializers.CharField(source="department.code", required=False)
    department_name = serializers.CharField(source="department.name", required=False)
    district = serializers.CharField(source="district.code", required=False)
    district_name = serializers.CharField(source="district.name", required=False)
    locality = serializers.CharField(source="code")
    locality_name = serializers.CharField(source="name", required=False)

    class Meta:
        model = Locality
        fields = (
            "department",
            "department_name",
            "district",
            "district_name",
            "locality",
            "locality_name",
        )
