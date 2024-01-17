from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices
from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseSummarySerializer,
)
from app.models.building_component_monitoring import BuildingComponentMonitoring
from app.serializers.building_component_serializer import BuildingComponentSerializer
from app.serializers.comment_serializer import CommentSerializer


class BuildingCompanyMonitoringSerializer(BaseDomainMixin, BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = BuildingComponentMonitoring
        fields = BaseModelSerializer.Meta.fields + (
            "execution_status",
            "quality_status",
            "expected_amount",
            "expected_end_date",
            "paid_amount",
            "pending_amount",
            "total_amount",
            "financial_progress_percentage",
            "physical_progress_percentage",
            "real_end_date",
            "building_component",
            "comments",
        )

    building_component = BuildingComponentSerializer(required=False, read_only=True)
    comments = CommentSerializer(read_only=True, many=True)

    domain_fields = [
        BaseDomainField(
            "execution_status", DomainCategoryChoices.execution_status_type
        ),
        BaseDomainField("quality_status", DomainCategoryChoices.quality_status_type),
    ]


class BuildingCompanyMonitoringSummarySerializer(
    BaseDomainMixin, BaseSummarySerializer
):
    class Meta(BaseSummarySerializer.Meta):
        model = BuildingComponentMonitoring
        fields = BaseSummarySerializer.Meta.fields + (
            "code",
            "name",
            "execution_status",
            "quality_status",
            "financial_progress_percentage",
            "physical_progress_percentage",
        )

    code = serializers.CharField(
        required=False, source="building_component.code", read_only=True
    )
    name = serializers.CharField(
        required=False, source="building_component.name", read_only=True
    )

    domain_fields = [
        BaseDomainField(
            "execution_status", DomainCategoryChoices.execution_status_type
        ),
        BaseDomainField("quality_status", DomainCategoryChoices.quality_status_type),
    ]
