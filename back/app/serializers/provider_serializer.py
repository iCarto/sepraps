from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseSummarySerializer,
)
from app.models.project import Project
from app.models.provider import Provider
from app.serializers.contact_relationship_serializer import ProviderContactSerializer
from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices


class ProviderSerializer(BaseDomainMixin, BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Provider
        fields = (
            *BaseModelSerializer.Meta.fields,
            "name",
            "area",
            "type",
            "number_of_members",
            "number_of_women",
            "is_legalized",
            "legalization_date",
            "is_provider_contract_signed",
            "legal_status_number",
            "local_resolution_number",
            "contacts",
            "projects",
        )

    contacts = ProviderContactSerializer(
        source="providercontact_set", many=True, required=False
    )
    projects = serializers.SerializerMethodField()

    domain_fields = (
        BaseDomainField("area", DomainCategoryChoices.provider_area),
        BaseDomainField("type", DomainCategoryChoices.provider_type),
        BaseDomainField("is_legalized", DomainCategoryChoices.yes_no_domain),
        BaseDomainField(
            "is_provider_contract_signed", DomainCategoryChoices.yes_no_domain
        ),
    )

    def get_projects(self, obj):
        from app.serializers.project_serializer import ProjectSummarySerializer

        projects = Project.objects.filter(provider=obj.id)
        serializer = ProjectSummarySerializer(projects, many=True)
        return serializer.data


class ProviderSummarySerializer(BaseDomainMixin, BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = Provider
        fields = (
            *BaseSummarySerializer.Meta.fields,
            "name",
            "area",
            "type",
            "is_legalized",
        )

    domain_fields = (
        BaseDomainField("area", DomainCategoryChoices.provider_area),
        BaseDomainField("type", DomainCategoryChoices.provider_type),
        BaseDomainField("is_legalized", DomainCategoryChoices.yes_no_domain),
    )
