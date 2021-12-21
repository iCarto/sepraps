from monitoring.models.provider import Provider
from rest_framework import serializers


class ProviderSerializer(serializers.ModelSerializer):

    department_name = serializers.CharField(source="department.name")
    district_name = serializers.CharField(source="district.name")
    locality_name = serializers.CharField(source="locality.name")

    class Meta:
        model = Provider
        fields = (
            "id",
            "name",
            "area",
            "department",
            "department_name",
            "district",
            "district_name",
            "locality",
            "locality_name",
        )
