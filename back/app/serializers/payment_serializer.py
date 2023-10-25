from decimal import Decimal

from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices
from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
    BaseSummarySerializer,
)
from app.models.payment import Payment
from app.serializers.comment_serializer import CommentSerializer
from app.serializers.product_serializer import ProductSerializer
from app.util import format_decimal


class PaymentSerializer(BaseDomainMixin, BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Payment
        fields = BaseModelWithFolderSerializer.Meta.fields + (
            "name",
            "expected_fixed_amount",
            "expected_variable_amount",
            "expected_total_amount",
            "expected_payment_date",
            "paid_fixed_amount",
            "paid_variable_amount",
            "paid_total_amount",
            "status",
            "payment_date",
            "contract",
            "contract_total_amount_type",
            "contract_payment_frequency_type",
            "contract_payment_criteria_type",
            "payment_products",
            "payment_comments",
            "expected_total_contract_percentage",
            "paid_total_contract_percentage",
            "expected_total_amount_cumulative",
            "expected_total_contract_percentage_cumulative",
            "paid_total_amount_cumulative",
            "paid_total_contract_percentage_cumulative",
            "expected_total_contract_amount",
        )

    domain_fields = [BaseDomainField("status", DomainCategoryChoices.payment_status)]

    payment_products = serializers.SerializerMethodField()
    payment_comments = serializers.SerializerMethodField()
    expected_total_contract_percentage = serializers.SerializerMethodField()
    expected_total_contract_percentage_cumulative = serializers.SerializerMethodField()
    paid_total_contract_percentage = serializers.SerializerMethodField()
    paid_total_contract_percentage_cumulative = serializers.SerializerMethodField()
    expected_total_contract_amount = serializers.CharField(
        source="contract.awarding_budget", read_only=True
    )
    contract_total_amount_type = serializers.CharField(
        source="contract.total_amount_type", read_only=True
    )
    contract_payment_frequency_type = serializers.CharField(
        source="contract.payment_frequency_type", read_only=True
    )
    contract_payment_criteria_type = serializers.CharField(
        source="contract.payment_criteria_type", read_only=True
    )

    def get_payment_products(self, instance):  # noqa: WPS615
        products = instance.products.all().order_by("created_at", "id")
        return ProductSerializer(
            products, read_only=True, many=True, context=self.context
        ).data

    def get_payment_comments(self, instance):  # noqa: WPS615
        comments = instance.comments.all().order_by("created_at", "id")
        return CommentSerializer(
            comments, read_only=True, many=True, context=self.context
        ).data

    def get_expected_total_contract_percentage(self, instance):  # noqa: WPS615
        instance_expected_total_amount = instance.expected_total_amount
        contract_expected_total_amount = instance.contract.awarding_budget
        if not instance_expected_total_amount or not contract_expected_total_amount:
            return None
        return format_decimal(
            100
            * Decimal(instance_expected_total_amount)
            / Decimal(contract_expected_total_amount)
        )

    def get_expected_total_contract_percentage_cumulative(
        self, instance
    ):  # noqa: WPS615
        expected_total_amount_cumulative = instance.expected_total_amount_cumulative
        contract_expected_total_amount = instance.contract.awarding_budget
        if not expected_total_amount_cumulative or not contract_expected_total_amount:
            return None
        return format_decimal(
            100
            * Decimal(expected_total_amount_cumulative)
            / Decimal(contract_expected_total_amount)
        )

    def get_paid_total_contract_percentage(self, instance):  # noqa: WPS615
        instance_paid_total_amount = instance.paid_total_amount
        contract_expected_total_amount = instance.contract.awarding_budget
        if not instance_paid_total_amount or not contract_expected_total_amount:
            return None
        return format_decimal(
            100
            * Decimal(instance_paid_total_amount)
            / Decimal(contract_expected_total_amount)
        )

    def get_paid_total_contract_percentage_cumulative(self, instance):  # noqa: WPS615
        paid_total_amount_cumulative = instance.paid_total_amount_cumulative
        contract_expected_total_amount = instance.contract.awarding_budget
        if not paid_total_amount_cumulative or not contract_expected_total_amount:
            return None
        return format_decimal(
            100
            * Decimal(paid_total_amount_cumulative)
            / Decimal(contract_expected_total_amount)
        )


class PaymentSummarySerializer(BaseDomainMixin, BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = Payment
        fields = BaseSummarySerializer.Meta.fields + (
            "name",
            "paid_total_amount",
            "status",
            "payment_date",
        )

    domain_fields = [BaseDomainField("status", DomainCategoryChoices.payment_status)]
