from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
    BaseSummarySerializer,
)
from app.models.certification import Certification
from app.models.payment import Payment
from app.serializers.comment_serializer import CommentSerializer
from app.serializers.payment_serializer import (
    PaymentSerializer,
    PaymentSummarySerializer,
)
from app.serializers.project_serializer import ProjectShortSerializer
from domains.mixins import BaseDomainMixin


class CertificationSerializer(BaseDomainMixin, BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Certification
        fields = (
            *BaseModelWithFolderSerializer.Meta.fields,
            "expected_amount",
            "approved_amount",
            "notes",
            "comments",
            "payment",
            "project",
        )

    payment = serializers.PrimaryKeyRelatedField(queryset=Payment.objects.all())
    comments = CommentSerializer(read_only=True, many=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if self.context["request"].method == "GET":
            payment_instance = instance.payment
            representation["payment"] = PaymentSerializer(
                payment_instance, context=self.context
            ).data
        return representation


class CertificationSummarySerializer(BaseDomainMixin, BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = Certification
        fields = (
            *BaseSummarySerializer.Meta.fields,
            "expected_amount",
            "approved_amount",
            "notes",
            "payment",
            "project",
        )

    payment = PaymentSummarySerializer(read_only=True)
    project = ProjectShortSerializer(read_only=True)
