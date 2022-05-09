from django.db.models import Prefetch
from monitoring.models.construction_contract import ConstructionContract
from monitoring.models.contact import Contact
from monitoring.models.contractor import Contractor
from monitoring.models.financing_program import FinancingProgram
from monitoring.models.milestone import Milestone
from monitoring.models.project import Project
from monitoring.serializers.contact_serializer import ContactSerializer
from monitoring.serializers.contractor_serializer import (
    ContractorSerializer,
    ContractorSummarySerializer,
)
from monitoring.serializers.financing_program_serializer import (
    FinancingProgramSerializer,
)
from rest_framework import serializers


class ConstructionContractSerializer(serializers.ModelSerializer):

    financing_program = serializers.PrimaryKeyRelatedField(
        required=False, allow_null=True, queryset=FinancingProgram.objects.all()
    )
    contractor = ContractorSerializer(required=False, allow_null=True)
    field_manager = ContactSerializer(required=False, allow_null=True)
    construction_inspector = ContactSerializer(required=False, allow_null=True)
    construction_supervisor = ContactSerializer(required=False, allow_null=True)
    social_coordinator = ContactSerializer(required=False, allow_null=True)
    social_inspector = ContactSerializer(required=False, allow_null=True)
    social_supervisor = ContactSerializer(required=False, allow_null=True)
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
            "financing_program",
            "contractor",
            "field_manager",
            "construction_inspector",
            "construction_supervisor",
            "social_coordinator",
            "social_inspector",
            "social_supervisor",
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
            "comments": {"allow_null": True, "allow_blank": True},
            "bid_request_number": {"required": True},
            "bid_request_id": {"required": True},
            "bid_request_date": {"required": True},
            "bid_request_budget": {"required": True},
            "bid_request_deadline": {"required": True},
        }

    def setup_eager_loading(queryset):
        """Perform necessary eager loading of data."""
        return queryset.select_related(
            "contractor", "financing_program"
        ).prefetch_related(
            "contractor__contacts",
            "financing_program__financing_funds",
            Prefetch(
                "projects__milestones",
                queryset=Milestone.objects.exclude(parent__isnull=False).order_by(
                    "ordering"
                ),
            ),
        )

    def to_representation(self, instance):
        # TODO To avoid circular dependencies with serializers we have
        # to load this inside a function
        from monitoring.serializers.project_serializer import ProjectSummarySerializer

        response = super().to_representation(instance)
        if "projects" in response:
            response["projects"] = ProjectSummarySerializer(
                instance.projects, many=True
            ).data
        if "financing_program" in response:
            response["financing_program"] = (
                FinancingProgramSerializer(
                    instance.financing_program, context=self.context
                ).data
                if instance.financing_program is not None
                else None
            )
        return response

    # ATTRIBUTES

    # OPERATIONS

    def create_monitoring_profile(self, monitoring_profile_key, validated_data):

        monitoring_profile_data = validated_data.pop(monitoring_profile_key, None)
        monitoring_profile = None
        if monitoring_profile_data:
            monitoring_profile, _ = Contact.objects.get_or_create(
                **monitoring_profile_data
            )

        return monitoring_profile

    def create(self, validated_data):

        contractor_data = validated_data.pop("contractor", None)
        contractor = None
        if contractor_data:
            contractor, _ = Contractor.objects.get_or_create(**contractor_data)

        projects_for_contract = validated_data.pop("projects")

        field_manager = self.create_monitoring_profile("field_manager", validated_data)
        construction_inspector = self.create_monitoring_profile(
            "construction_inspector", validated_data
        )
        construction_supervisor = self.create_monitoring_profile(
            "construction_supervisor", validated_data
        )
        social_coordinator = self.create_monitoring_profile(
            "social_coordinator", validated_data
        )
        social_inspector = self.create_monitoring_profile(
            "social_inspector", validated_data
        )
        social_supervisor = self.create_monitoring_profile(
            "social_supervisor", validated_data
        )

        construction_contract = ConstructionContract.objects.create(
            **validated_data,
            contractor=contractor,
            field_manager=field_manager,
            construction_inspector=construction_inspector,
            construction_supervisor=construction_supervisor,
            social_coordinator=social_coordinator,
            social_inspector=social_inspector,
            social_supervisor=social_supervisor,
        )
        construction_contract.projects.set(projects_for_contract)

        return construction_contract

    def update_contractor(self, instance, validated_data):
        contractor_data = validated_data.pop("contractor", None)

        contractor = None
        if contractor_data:

            if "id" in contractor_data and contractor_data["id"] is not None:
                contractor = self.fields["contractor"].update(
                    Contractor.objects.get(pk=contractor_data["id"]), contractor_data
                )
            else:
                contractor = self.fields["contractor"].create(contractor_data)

        instance.contractor = contractor

    def update_monitoring_profiles(
        self, monitoring_profile_key, instance, validated_data
    ):
        monitoring_profile_data = validated_data.pop(monitoring_profile_key, None)

        monitoring_profile = None
        if monitoring_profile_data:

            if (
                "id" in monitoring_profile_data
                and monitoring_profile_data["id"] is not None
            ):
                monitoring_profile = self.fields[monitoring_profile_key].update(
                    Contact.objects.get(pk=monitoring_profile_data["id"]),
                    monitoring_profile_data,
                )
            else:
                monitoring_profile = self.fields[monitoring_profile_key].create(
                    monitoring_profile_data
                )

        setattr(instance, monitoring_profile_key, monitoring_profile)

    def update(self, instance, validated_data):

        self.update_contractor(instance, validated_data)
        self.update_monitoring_profiles("field_manager", instance, validated_data)
        self.update_monitoring_profiles(
            "construction_inspector", instance, validated_data
        )
        self.update_monitoring_profiles(
            "construction_supervisor", instance, validated_data
        )
        self.update_monitoring_profiles("social_coordinator", instance, validated_data)
        self.update_monitoring_profiles("social_inspector", instance, validated_data)
        self.update_monitoring_profiles("social_supervisor", instance, validated_data)

        projects_for_contract = validated_data.pop("projects")
        instance.projects.set(projects_for_contract)

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()
        return instance


class ConstructionContractSummarySerializer(serializers.ModelSerializer):

    financing_program = FinancingProgramSerializer()
    contractor = ContractorSummarySerializer()

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
            "financing_program",
            "contractor",
            "execution_signature_date",
            "created_at",
            "updated_at",
        )

    def setup_eager_loading(queryset):
        """Perform necessary eager loading of data."""
        return queryset.select_related(
            "contractor", "financing_program"
        ).prefetch_related("financing_program__financing_funds")

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields


class ConstructionContractShortSerializer(ConstructionContractSerializer):
    class Meta(ConstructionContractSerializer.Meta):
        fields = ("id", "number", "bid_request_number")
