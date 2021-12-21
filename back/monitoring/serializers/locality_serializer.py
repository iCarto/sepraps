from monitoring.models.location import Locality
from rest_framework import serializers


class LocalitySerializer(serializers.ModelSerializer):

    department = serializers.CharField(source="department.code")
    department_name = serializers.CharField(source="department.name")
    district = serializers.CharField(source="district.code")
    district_name = serializers.CharField(source="district.name")
    locality = serializers.CharField(source="code")
    locality_name = serializers.CharField(source="name")

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
