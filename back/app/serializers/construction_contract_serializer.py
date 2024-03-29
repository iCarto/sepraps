import itertools

from django.db.models import Prefetch
from rest_framework import serializers

from app.models.construction_contract import ConstructionContract
from app.models.contact import Contact
from app.models.contractor import Contractor
from app.models.financing_program import FinancingProgram
from app.models.milestone import Milestone
from app.models.project import Project
from app.serializers.contract_supervision_area_serializer import (
    ContractSupervisionAreaSerializer,
)
from app.serializers.contractor_serializer import (
    ContractorSerializer,
    ContractorSummarySerializer,
)
from app.serializers.financing_program_serializer import FinancingProgramSerializer
from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices
from questionnaires.serializers.questionnaire_serializer import (
    QuestionnaireShortSerializer,
)


class StringListField(serializers.ListField):
    child = serializers.CharField()


class ConstructionContractSummarySerializer(
    BaseDomainMixin, serializers.ModelSerializer
):
    class Meta(object):
        model = ConstructionContract
        fields = (
            "id",
            "number",
            "comments",
            "services",
            "total_amount_type",
            "product_frequency_type",
            "payment_criteria_type",
            "bid_request_number",
            "bid_request_id",
            "bid_request_date",
            "bid_request_budget_min",
            "bid_request_budget",
            "awarding_budget_min",
            "awarding_budget",
            "awarding_date",
            "financing_program",
            "contractor",
            "execution_signature_date",
            "execution_start_date",
            "expected_execution_period",
            "total_awarding_budget",
            "total_expected_execution_period",
            "total_amount_approved",
            "total_amount_pending",
            "total_amount",
            "created_at",
            "updated_at",
        )

    services = serializers.ListField(child=serializers.CharField())

    domain_fields = (
        BaseDomainField("services", DomainCategoryChoices.service_type, many=True),
        BaseDomainField("total_amount_type", DomainCategoryChoices.total_amount_type),
        BaseDomainField(
            "product_frequency_type", DomainCategoryChoices.product_frequency_type
        ),
        BaseDomainField(
            "payment_criteria_type", DomainCategoryChoices.payment_criteria_type
        ),
    )

    financing_program = FinancingProgramSerializer()
    contractor = ContractorSummarySerializer()

    def setup_eager_loading(queryset):
        """Perform necessary eager loading of data."""
        return queryset.select_related(
            "contractor", "financing_program"
        ).prefetch_related(
            "financing_program__financing_funds",
            "contract_amendments",
            "contract_payments",
        )

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields


class ConstructionContractSerializer(BaseDomainMixin, serializers.ModelSerializer):
    class Meta(object):
        model = ConstructionContract
        fields = (
            "id",
            "number",
            "comments",
            "services",
            "supervision_areas",
            "total_amount_type",
            "product_frequency_type",
            "payment_criteria_type",
            "bid_request_number",
            "bid_request_id",
            "bid_request_lot_number",
            "bid_request_date",
            "bid_request_budget_min",
            "bid_request_budget",
            "awarding_budget_min",
            "awarding_budget",
            "awarding_percentage_drop",
            "awarding_date",
            "awarding_professional_liability_insurance",
            "awarding_liability_insurance",
            "awarding_accident_insurance",
            "financing_program",
            "contractor",
            "execution_signature_date",
            "execution_start_date",
            "expected_execution_period",
            "warranty_end_date",
            "projects",
            "questionnaires",
            "related_contracts",
            "total_amendments_amount",
            "total_awarding_budget",
            "total_expected_execution_period",
            "total_amount_approved",
            "total_amount_pending",
            "total_amount",
            "total_amount_percentage",
            "creation_user",
            "created_at",
            "updated_by",
            "updated_at",
        )
        extra_kwargs = {
            "number": {"required": True},
            "comments": {"allow_null": True, "allow_blank": True},
            "bid_request_number": {"required": True},
            "bid_request_id": {"required": True},
            "bid_request_date": {"required": True},
            "bid_request_budget": {"required": True},
            "bid_request_lot_number": {"allow_null": True, "allow_blank": True},
        }

    services = serializers.ListField(child=serializers.CharField())
    financing_program = serializers.PrimaryKeyRelatedField(
        required=False, allow_null=True, queryset=FinancingProgram.objects.all()
    )
    contractor = serializers.PrimaryKeyRelatedField(
        required=False, allow_null=True, queryset=Contractor.objects.all()
    )
    projects = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Project.objects.all()
    )
    creation_user = serializers.CharField(
        source="creation_user.username", required=False
    )
    updated_by = serializers.CharField(source="updated_by.username", required=False)
    questionnaires = serializers.SerializerMethodField()
    supervision_areas = ContractSupervisionAreaSerializer(many=True, read_only=True)
    related_contracts = serializers.ListField(
        child=ConstructionContractSummarySerializer(), read_only=True
    )
    total_amendments_amount = serializers.DecimalField(
        decimal_places=2, max_digits=32, read_only=True
    )
    total_awarding_budget = serializers.DecimalField(
        decimal_places=2, max_digits=32, read_only=True
    )
    total_amount_approved = serializers.DecimalField(
        decimal_places=2, max_digits=32, read_only=True
    )
    total_amount_pending = serializers.DecimalField(
        decimal_places=2, max_digits=32, read_only=True
    )
    total_amount = serializers.DecimalField(
        decimal_places=2, max_digits=32, read_only=True
    )
    total_amount_percentage = serializers.DecimalField(
        decimal_places=2, max_digits=10, read_only=True
    )

    domain_fields = (
        BaseDomainField("services", DomainCategoryChoices.service_type, many=True),
        BaseDomainField(
            "awarding_professional_liability_insurance",
            DomainCategoryChoices.yes_no_domain,
        ),
        BaseDomainField(
            "awarding_liability_insurance", DomainCategoryChoices.yes_no_domain
        ),
        BaseDomainField(
            "awarding_accident_insurance", DomainCategoryChoices.yes_no_domain
        ),
        BaseDomainField("total_amount_type", DomainCategoryChoices.total_amount_type),
        BaseDomainField(
            "product_frequency_type", DomainCategoryChoices.product_frequency_type
        ),
        BaseDomainField(
            "payment_criteria_type", DomainCategoryChoices.payment_criteria_type
        ),
    )

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
            "contract_amendments",
            "contract_payments",
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
        response = super().to_representation(instance)
        if "financing_program" in response:
            response["financing_program"] = (
                FinancingProgramSerializer(
                    instance.financing_program, context=self.context
                ).data
                if instance.financing_program is not None
                else None
            )

        if "contractor" in response:
            response["contractor"] = (
                ContractorSerializer(instance.contractor, context=self.context).data
                if instance.contractor is not None
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
        contacts = validated_data.pop("constructioncontractcontact_set", None)

        projects_for_contract = validated_data.pop("projects")

        construction_contract = ConstructionContract.objects.create(**validated_data)
        construction_contract.projects.set(projects_for_contract)

        if contacts:
            self.fields["contacts"].update(construction_contract, [], contacts)

        return construction_contract

    def update_contacts(self, instance, validated_data):
        contacts = validated_data.pop("constructioncontractcontact_set", None)
        if contacts:
            self.fields["contacts"].update(instance, instance.contacts.all(), contacts)

    def update(self, instance, validated_data):
        self.update_contacts(instance, validated_data)

        projects_for_contract = validated_data.pop("projects")
        instance.projects.set(projects_for_contract)

        # nested entities properties were removed in previous methods
        for key in validated_data.keys():
            setattr(instance, key, validated_data.get(key, getattr(instance, key)))

        instance.save()
        return instance


class ConstructionContractShortSerializer(ConstructionContractSerializer):
    class Meta(ConstructionContractSerializer.Meta):
        fields = ("id", "number", "bid_request_number")
