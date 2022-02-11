from monitoring.models.construction_contract import ConstructionContract
from monitoring.models.project import Project
from rest_framework import serializers


class ConstructionContractSerializer(serializers.ModelSerializer):

    projects = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Project.objects.all()
    )
    creation_user = serializers.CharField(
        source="creation_user.username", required=False
    )

    class Meta:
        model = ConstructionContract
        fields = (
            "id",
            "number",
            "comments",
            "bid_request_number",
            "bid_request_id",
            "bid_request_date",
            "bid_request_budget",
            "bid_request_deadline",
            "awarding_budget",
            "awarding_percentage_drop",
            "awarding_date",
            "execution_signature_date",
            "execution_order_start_date",
            "execution_certificate_start_date",
            "execution_expected_delivery_date",
            "execution_final_delivery_date",
            "projects",
            "creation_user",
            "created_at",
            "updated_at",
        )

    # ATTRIBUTES

    def to_representation(self, instance):
        # TODO To avoid circular dependencies with serializers we have
        # to load this inside a function
        from monitoring.serializers.project_serializer import ProjectSummarySerializer

        response = super().to_representation(instance)
        if "projects" in response:
            response["projects"] = ProjectSummarySerializer(
                instance.projects, many=True
            ).data
        return response

    # OPERATIONS

    def create(self, validated_data):

        projects_for_contract = validated_data.pop("projects")

        construction_contract = ConstructionContract.objects.create(**validated_data)
        construction_contract.projects.set(projects_for_contract)

        return construction_contract

    def update(self, instance, validated_data):

        projects_for_contract = validated_data.pop("projects")
        instance.projects.set(projects_for_contract)

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()
        return instance


class ConstructionContractSummarySerializer(ConstructionContractSerializer):
    class Meta(ConstructionContractSerializer.Meta):
        fields = (
            "id",
            "number",
            "comments",
            "bid_request_number",
            "bid_request_id",
            "bid_request_date",
            "bid_request_budget",
            "awarding_budget",
            "awarding_date",
            "execution_signature_date",
            "created_at",
            "updated_at",
        )

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields


class ConstructionContractShortSerializer(ConstructionContractSerializer):
    class Meta(ConstructionContractSerializer.Meta):
        fields = ("id", "number", "bid_request_number")
