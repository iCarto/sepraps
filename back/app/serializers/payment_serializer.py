from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
    BaseSummarySerializer,
)
from app.models.payment import Payment


class PaymentSerializer(BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Payment
        fields = BaseModelWithFolderSerializer.Meta.fields + (
            "name",
            "amount",
            "status",
            "status_label",
            "payment_date",
            "contract",
        )

    status_label = serializers.SerializerMethodField()

    def get_status_label(self, obj):  # noqa: WPS615
        return obj.get_status_label()


class PaymentSummarySerializer(BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = Payment
        fields = BaseSummarySerializer.Meta.fields + (
            "name",
            "amount",
            "status",
            "status_label",
            "payment_date",
        )

    status_label = serializers.SerializerMethodField()

    def get_status_label(self, obj):  # noqa: WPS615
        return obj.get_status_label()
