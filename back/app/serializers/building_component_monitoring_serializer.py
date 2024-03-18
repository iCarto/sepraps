from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseSummarySerializer,
)
from app.models.building_component_monitoring import BuildingComponentMonitoring
from app.serializers.building_component_serializer import BuildingComponentSerializer
from app.serializers.comment_serializer import CommentSerializer
from app.util import format_decimal
from documents.serializers import MediaUrlSerializer
from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices


class BuildingComponentMonitoringSerializer(BaseDomainMixin, BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = BuildingComponentMonitoring
        fields = (
            *BaseModelSerializer.Meta.fields,
            "execution_status",
            "quality_status",
            "expected_amount",
            "expected_end_date",
            "paid_amount",
            "pending_amount",
            "total_amount",
            "financial_progress_percentage",
            "physical_progress_percentage",
            "financial_weight_percentage",
            "real_end_date",
            "building_component",
            "project",
            "comments",
        )

    financial_progress_percentage = serializers.SerializerMethodField(
        required=False, read_only=True
    )
    financial_weight_percentage = serializers.SerializerMethodField(
        required=False, read_only=True
    )

    building_component = BuildingComponentSerializer(required=False, read_only=True)
    comments = CommentSerializer(read_only=True, many=True)

    def get_financial_progress_percentage(self, obj):
        return (
            format_decimal(obj.progress.financial_progress_percentage)
            if obj.progress.financial_progress_percentage
            else None
        )

    def get_financial_weight_percentage(self, obj):
        return (
            format_decimal(obj.progress.financial_weight * 100)
            if obj.progress.financial_weight
            else None
        )

    domain_fields = (
        BaseDomainField(
            "execution_status", DomainCategoryChoices.execution_status_type
        ),
        BaseDomainField("quality_status", DomainCategoryChoices.quality_status_type),
    )


class BuildingComponentMonitoringSummarySerializer(
    BaseDomainMixin, BaseSummarySerializer
):
    class Meta(BaseSummarySerializer.Meta):
        model = BuildingComponentMonitoring
        fields = (
            *BaseSummarySerializer.Meta.fields,
            "execution_status",
            "quality_status",
            "physical_progress_percentage",
            "financial_progress_percentage",
            "financial_weight_percentage",
            "featured_image",
            "building_component",
            "project",
        )

    financial_progress_percentage = serializers.SerializerMethodField(
        required=False, read_only=True
    )
    financial_weight_percentage = serializers.SerializerMethodField(
        required=False, read_only=True
    )

    building_component = BuildingComponentSerializer(required=False, read_only=True)

    def get_financial_progress_percentage(self, obj):
        return (
            format_decimal(obj.progress.financial_progress_percentage)
            if obj.progress.financial_progress_percentage
            else None
        )

    def get_financial_weight_percentage(self, obj):
        return (
            format_decimal(obj.progress.financial_weight * 100)
            if obj.progress.financial_weight
            else None
        )

    domain_fields = (
        BaseDomainField(
            "execution_status", DomainCategoryChoices.execution_status_type
        ),
        BaseDomainField("quality_status", DomainCategoryChoices.quality_status_type),
    )

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "featured_image" in response:
            response.update(
                {
                    "featured_image": (
                        MediaUrlSerializer(
                            instance.featured_image,
                            context={"request": self.context.get("request")},
                        ).data["url"]
                        if instance.featured_image is not None
                        else None
                    )
                }
            )
        return response
