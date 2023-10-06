from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
    BaseSummarySerializer,
)
from app.models.payment import Payment
from app.serializers.product_serializer import ProductSerializer


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
            "payment_products",
        )

    status_label = serializers.SerializerMethodField()
    payment_products = serializers.SerializerMethodField()

    def get_status_label(self, obj):  # noqa: WPS615
        return obj.get_status_label()

    def get_payment_products(self, instance):  # noqa: WPS615
        products = instance.products.all().order_by("created_at", "id")
        return ProductSerializer(
            products, read_only=True, many=True, context=self.context
        ).data


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
