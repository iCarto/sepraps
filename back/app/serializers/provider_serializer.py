from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseSummarySerializer,
)
from app.models.provider import Provider
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
        )

    domain_fields = (
        BaseDomainField("area", DomainCategoryChoices.provider_area),
        BaseDomainField("type", DomainCategoryChoices.provider_type),
        BaseDomainField("is_legalized", DomainCategoryChoices.yes_no_domain),
        BaseDomainField(
            "is_provider_contract_signed", DomainCategoryChoices.yes_no_domain
        ),
    )


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
