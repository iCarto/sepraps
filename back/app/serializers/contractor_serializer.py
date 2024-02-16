from rest_framework import serializers

from app.models.contractor import Contractor
from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices


class ContractorSerializer(BaseDomainMixin, serializers.ModelSerializer):
    id = serializers.IntegerField(allow_null=True, required=False)

    class Meta(object):
        model = Contractor
        fields = (
            "id",
            "name",
            "contractor_type",
            "address",
            "phone",
            "email",
            "comments",
        )
        extra_kwargs = {
            "address": {"allow_null": True, "allow_blank": True},
            "phone": {"allow_null": True, "allow_blank": True},
            "email": {"allow_null": True, "allow_blank": True},
            "address": {"allow_null": True, "allow_blank": True},
            "comments": {"allow_null": True, "allow_blank": True},
        }

    domain_fields = (
        BaseDomainField("contractor_type", DomainCategoryChoices.contractor_type),
    )


class ContractorSummarySerializer(ContractorSerializer):
    class Meta(ContractorSerializer.Meta):
        fields = (
            "id",
            "name",
            "contractor_type",
            "address",
            "phone",
            "email",
            "comments",
        )

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields

    domain_fields = (
        BaseDomainField("contractor_type", DomainCategoryChoices.contractor_type),
    )
