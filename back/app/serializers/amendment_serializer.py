from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
    BaseSummarySerializer,
)
from app.models.amendment import Amendment


class AmendmentSerializer(BaseDomainMixin, BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Amendment
        fields = BaseModelWithFolderSerializer.Meta.fields + (
            "signature_date",
            "amendment_type",
            "extra_amount",
            "extra_period",
            "cumulative_contract_amended_amount",
            "cumulative_contract_amended_execution_period",
            "contract",
        )

    domain_fields = [
        BaseDomainField("amendment_type", DomainCategoryChoices.amendment_type)
    ]


class AmendmentSummarySerializer(BaseDomainMixin, BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = Amendment
        fields = BaseSummarySerializer.Meta.fields + (
            "signature_date",
            "amendment_type",
            "extra_amount",
            "extra_period",
        )

    domain_fields = [
        BaseDomainField("amendment_type", DomainCategoryChoices.amendment_type)
    ]
