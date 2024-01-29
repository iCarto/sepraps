from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseSummarySerializer,
)
from app.models.social_component_monitoring import SocialComponentMonitoring
from app.serializers.comment_serializer import CommentSerializer
from app.serializers.social_component_training_serializer import (
    SocialComponentTrainingSerializer,
)
from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices


class SocialComponentMonitoringSerializer(BaseDomainMixin, BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = SocialComponentMonitoring
        fields = BaseModelSerializer.Meta.fields + (
            "code",
            "name",
            "execution_status",
            "quality_status",
            "expected_end_date",
            "real_end_date",
            "progress_percentage",
            "comments",
        )

    comments = CommentSerializer(read_only=True, many=True)

    domain_fields = [
        BaseDomainField(
            "execution_status", DomainCategoryChoices.execution_status_type
        ),
        BaseDomainField("quality_status", DomainCategoryChoices.quality_status_type),
    ]


class SocialComponentMonitoringSummarySerializer(
    BaseDomainMixin, BaseSummarySerializer
):
    class Meta(BaseSummarySerializer.Meta):
        model = SocialComponentMonitoring
        fields = BaseSummarySerializer.Meta.fields + (
            "code",
            "name",
            "progress_percentage",
            "execution_status",
            "quality_status",
            "trainings",
        )

    trainings = serializers.ListField(
        child=SocialComponentTrainingSerializer(), read_only=True
    )

    domain_fields = [
        BaseDomainField(
            "execution_status", DomainCategoryChoices.execution_status_type
        ),
        BaseDomainField("quality_status", DomainCategoryChoices.quality_status_type),
    ]

    def setup_eager_loading(queryset):
        """Perform necessary eager loading of data."""
        return queryset.select_related(
            "social_component_monitoring", "contract", "contractor"
        ).prefetch_related(
            "social_component_monitoring_trainings",
            "contract_social_trainings",
            "contractor_social_trainings",
        )
