from monitoring.models.provider import Provider
from rest_framework import serializers


class ProviderSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(allow_null=True)
    department_name = serializers.CharField(source="department.name", required=False)
    district_name = serializers.CharField(source="district.name", required=False)
    locality_name = serializers.CharField(source="locality.name", required=False)

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
