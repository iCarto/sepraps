from decimal import Decimal

from django.db import models
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
from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices


class PaymentSerializer(BaseDomainMixin, BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Payment
        fields = (
            *BaseModelWithFolderSerializer.Meta.fields,
            "name",
            "expected_fixed_amount",
            "expected_variable_amount",
            "expected_total_amount",
            "expected_approval_date",
            "paid_fixed_amount",
            "paid_variable_amount",
            "paid_total_amount",
            "status",
            "approval_date",
            "contract",
            "contract_total_amount_type",
            "contract_product_frequency_type",
            "contract_payment_criteria_type",
            "payment_products",
            "payment_comments",
            "expected_total_contract_percentage",
            "expected_awarded_contract_percentage",
            "expected_awarded_contract_percentage_cumulative",
            "expected_total_amount_cumulative",
            "expected_total_contract_percentage_cumulative",
            "paid_total_amount_cumulative",
            "paid_awarded_contract_percentage",
            "paid_awarded_contract_percentage_cumulative",
            "expected_total_contract_amount",
            "amended_expected_total_contract_amount",
            "certifications",
            "certifications_total_amount",
        )

    domain_fields = (BaseDomainField("status", DomainCategoryChoices.product_status),)

    payment_products = serializers.SerializerMethodField()
    payment_comments = CommentSerializer(source="comments", read_only=True, many=True)
    expected_awarded_contract_percentage = serializers.SerializerMethodField()
    expected_awarded_contract_percentage_cumulative = (
        serializers.SerializerMethodField()
    )
    expected_total_contract_percentage = serializers.SerializerMethodField()
    expected_total_contract_percentage_cumulative = serializers.SerializerMethodField()
    paid_awarded_contract_percentage = serializers.SerializerMethodField()
    paid_awarded_contract_percentage_cumulative = serializers.SerializerMethodField()
    expected_total_contract_amount = serializers.CharField(
        source="contract.awarding_budget", read_only=True
    )
    amended_expected_total_contract_amount = serializers.CharField(
        source="contract.total_awarding_budget", read_only=True
    )
    contract_total_amount_type = serializers.CharField(
        source="contract.total_amount_type", read_only=True
    )
    contract_product_frequency_type = serializers.CharField(
        source="contract.product_frequency_type", read_only=True
    )
    contract_payment_criteria_type = serializers.CharField(
        source="contract.payment_criteria_type", read_only=True
    )
    certifications = serializers.SerializerMethodField()
    certifications_total_amount = serializers.SerializerMethodField()

    def get_payment_products(self, instance):
        products = instance.products.all().order_by("created_at", "id")
        return ProductSerializer(
            products, read_only=True, many=True, context=self.context
        ).data

    def get_expected_awarded_contract_percentage(self, instance):
        instance_expected_total_amount = instance.expected_total_amount
        contract_awarded_amount = instance.contract.total_awarding_budget
        if not instance_expected_total_amount or not contract_awarded_amount:
            return None
        return format_decimal(
            100
            * Decimal(instance_expected_total_amount)
            / Decimal(contract_awarded_amount)
        )

    def get_expected_awarded_contract_percentage_cumulative(self, instance):
        expected_total_amount_cumulative = instance.expected_total_amount_cumulative
        contract_awarded_amount = instance.contract.total_awarding_budget
        if not expected_total_amount_cumulative or not contract_awarded_amount:
            return None
        return format_decimal(
            100
            * Decimal(expected_total_amount_cumulative)
            / Decimal(contract_awarded_amount)
        )

    def get_expected_total_contract_percentage(self, instance):
        instance_expected_total_amount = instance.expected_total_amount
        contract_expected_total_amount = instance.contract.total_amount
        if not instance_expected_total_amount or not contract_expected_total_amount:
            return None
        return format_decimal(
            100
            * Decimal(instance_expected_total_amount)
            / Decimal(contract_expected_total_amount)
        )

    def get_expected_total_contract_percentage_cumulative(self, instance):
        expected_total_amount_cumulative = instance.expected_total_amount_cumulative
        contract_expected_total_amount = instance.contract.total_amount
        if not expected_total_amount_cumulative or not contract_expected_total_amount:
            return None
        return format_decimal(
            100
            * Decimal(expected_total_amount_cumulative)
            / Decimal(contract_expected_total_amount)
        )

    def get_paid_awarded_contract_percentage(self, instance):
        instance_paid_total_amount = instance.paid_total_amount
        contract_awarded_amount = instance.contract.total_awarding_budget
        if not instance_paid_total_amount or not contract_awarded_amount:
            return None
        return format_decimal(
            100 * Decimal(instance_paid_total_amount) / Decimal(contract_awarded_amount)
        )

    def get_paid_awarded_contract_percentage_cumulative(self, instance):
        paid_total_amount_cumulative = instance.paid_total_amount_cumulative
        contract_awarded_amount = instance.contract.total_awarding_budget
        if not paid_total_amount_cumulative or not contract_awarded_amount:
            return None
        return format_decimal(
            100
            * Decimal(paid_total_amount_cumulative)
            / Decimal(contract_awarded_amount)
        )

    def get_certifications(self, instance):
        from app.serializers.certification_serializer import (
            CertificationSummarySerializer,
        )

        certifications = instance.certifications.all().order_by("project__code")
        return CertificationSummarySerializer(
            certifications, read_only=True, many=True, context=self.context
        ).data

    def get_certifications_total_amount(self, instance):
        certifications = instance.certifications.all()
        return (
            certifications.aggregate(total_amount=models.Sum("approved_amount"))[
                "total_amount"
            ]
            or 0
        )


class PaymentSummarySerializer(BaseDomainMixin, BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = Payment
        fields = (
            *BaseSummarySerializer.Meta.fields,
            "name",
            "status",
            "expected_total_amount",
            "expected_approval_date",
            "paid_total_amount",
            "approval_date",
        )

    domain_fields = (BaseDomainField("status", DomainCategoryChoices.product_status),)
