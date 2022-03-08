from monitoring.models.construction_contract import ConstructionContract
from monitoring.models.contractor import Contractor
from monitoring.models.project import Project
from monitoring.serializers.contractor_serializer import ContractorSerializer
from rest_framework import serializers


class ConstructionContractSerializer(serializers.ModelSerializer):

    contractor = ContractorSerializer(required=False, allow_null=True)
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
            "contractor",
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
        extra_kwargs = {
            "number": {"required": True},
            "bid_request_number": {"required": True},
            "bid_request_id": {"required": True},
            "bid_request_date": {"required": True},
            "bid_request_budget": {"required": True},
            "bid_request_deadline": {"required": True},
        }

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

        contractor_data = validated_data.pop("contractor", None)
        contractor = None
        if contractor_data:
            contractor, _ = Contractor.objects.get_or_create(**contractor_data)

        projects_for_contract = validated_data.pop("projects")

        construction_contract = ConstructionContract.objects.create(
            **validated_data, contractor=contractor
        )
        construction_contract.projects.set(projects_for_contract)

        return construction_contract

    def update_contractor(self, instance, validated_data):
        contractor_data = validated_data.pop("contractor")

        contractor = None
        if contractor_data:

            if "id" in contractor_data and contractor_data["id"] is not None:
                contractor = self.fields["contractor"].update(
                    Contractor.objects.get(pk=contractor_data["id"]), contractor_data
                )
            else:
                contractor = self.fields["contractor"].create(contractor_data)

        instance.contractor = contractor

    def update(self, instance, validated_data):

        self.update_contractor(instance, validated_data)

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
            "bid_request_deadline",
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
