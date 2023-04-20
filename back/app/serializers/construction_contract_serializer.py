import itertools

from django.db.models import Prefetch
from app.models.construction_contract import ConstructionContract
from app.models.contact import Contact
from app.models.contact_relationship import (
    ConstructionContractContact,
    ContractorContact,
    ProviderContact,
)
from app.models.contractor import Contractor
from app.models.financing_program import FinancingProgram
from app.models.milestone import Milestone
from app.models.project import Project
from app.serializers.contact_relationship_serializer import (
    ContactConstructionContractSerializer,
)
from app.serializers.contact_serializer import ContactSerializer
from app.serializers.contractor_serializer import (
    ContractorSerializer,
    ContractorSummarySerializer,
)
from app.serializers.financing_program_serializer import FinancingProgramSerializer
from questionnaires.serializers.questionnaire_serializer import (
    QuestionnaireShortSerializer,
)
from rest_framework import serializers


class ConstructionContractSerializer(serializers.ModelSerializer):
    financing_program = serializers.PrimaryKeyRelatedField(
        required=False, allow_null=True, queryset=FinancingProgram.objects.all()
    )
    contractor = ContractorSerializer(required=False, allow_null=True)
    contacts = ContactConstructionContractSerializer(
        source="constructioncontractcontact_set", many=True, required=False
    )
    projects = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Project.objects.all()
    )
    creation_user = serializers.CharField(
        source="creation_user.username", required=False
    )
    questionnaires = serializers.SerializerMethodField()

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
            "awarding_budget",
            "awarding_percentage_drop",
            "awarding_date",
            "financing_program",
            "contractor",
            "contacts",
            "execution_signature_date",
            "execution_certificate_start_date",
            "expected_execution_period",
            "execution_final_delivery_date",
            "warranty_end_date",
            "projects",
            "questionnaires",
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
        }

    def setup_eager_loading(queryset):
        """Perform necessary eager loading of data."""
        return queryset.select_related(
            "contractor", "financing_program"
        ).prefetch_related(
            # TODO Improve contacts load to avoid multiples queries
            "financing_program__financing_funds",
            "projects",
            "projects__linked_localities",
            "projects__provider",
            "projects__main_infrastructure",
            "projects__questionnaires",
            # Prefetch(
            #     "contacts", queryset=ProviderContact.objects.select_related("contact")
            # ),
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
        from app.serializers.project_serializer import ProjectSummarySerializer

        response = super().to_representation(instance)
        if "projects" in response:
            response["projects"] = ProjectSummarySerializer(
                instance.projects, many=True, context=self.context
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

    def get_questionnaires(self, obj):
        projects = obj.projects.all()
        questionnaires = [project.questionnaires.all() for project in projects]
        questionnaires = list(itertools.chain(*questionnaires))
        return QuestionnaireShortSerializer(set(questionnaires), many=True).data

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
        contacts = validated_data.pop("constructioncontractcontact_set", None)

        contractor = None
        if contractor_data:
            contractor, _ = Contractor.objects.get_or_create(**contractor_data)

        projects_for_contract = validated_data.pop("projects")

        construction_contract = ConstructionContract.objects.create(
            **validated_data, contractor=contractor
        )
        construction_contract.projects.set(projects_for_contract)

        if contacts:
            self.fields["contacts"].update(construction_contract, [], contacts)

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

    def update_contacts(self, instance, validated_data):
        contacts = validated_data.pop("constructioncontractcontact_set", None)
        if contacts:
            self.fields["contacts"].update(instance, instance.contacts.all(), contacts)

    def update(self, instance, validated_data):
        self.update_contractor(instance, validated_data)
        self.update_contacts(instance, validated_data)

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
            "awarding_budget",
            "awarding_date",
            "financing_program",
            "contractor",
            "execution_signature_date",
            "execution_certificate_start_date",
            "expected_execution_period",
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
