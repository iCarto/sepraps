from monitoring.models.location import (
    Department,
    District,
    Locality,
    get_code_for_new_locality,
)
from rest_framework import serializers


class LocalityListSerializer(serializers.ListSerializer):
    def update(self, instances, validated_data):
        if validated_data is None:
            return instances

        localities_mapping = {locality.code: locality for locality in instances}

        ret = []
        for locality_data in validated_data:
            locality = localities_mapping.get(locality_data.get("code"), None)

            if locality_data.get("code") is None:
                locality_data["code"] = get_code_for_new_locality(
                    locality_data.get("department"), locality_data.get("district")
                )
                ret.append(self.child.create(locality_data))
                continue

            # localities cannot be updated
            if locality is None:
                locality = Locality.objects.get(pk=locality_data.get("code"))
            ret.append(locality)
        return ret


class LocalitySerializer(serializers.ModelSerializer):

    code = serializers.CharField(allow_null=True)
    name = serializers.CharField()
    district = serializers.PrimaryKeyRelatedField(queryset=District.objects.all())
    district_name = serializers.CharField(source="district.name", read_only=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    department_name = serializers.CharField(source="department.name", read_only=True)

    class Meta:
        model = Locality
        fields = (
            "code",
            "name",
            "district",
            "district_name",
            "department",
            "department_name",
        )
        list_serializer_class = LocalityListSerializer

    @classmethod
    def many_init(cls, *args, **kwargs):
        # Return LocalityListSerializer when many=True
        kwargs["child"] = cls()
        return LocalityListSerializer(*args, **kwargs)
