from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
    BaseSummarySerializer,
)
from app.models.payment import Payment
from app.serializers.comment_serializer import CommentSerializer
from app.serializers.product_serializer import ProductSerializer


class PaymentSerializer(BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Payment
        fields = BaseModelWithFolderSerializer.Meta.fields + (
            "name",
            "fixed_amount",
            "variable_amount",
            "expected_fixed_amount",
            "expected_variable_amount",
            "appraisal",
            "appraisal_label",
            "status",
            "status_label",
            "payment_date",
            "contract",
            "payment_products",
            "payment_comments",
        )

    payment_products = serializers.SerializerMethodField()
    payment_comments = serializers.SerializerMethodField()

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


class PaymentSummarySerializer(BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = Payment
        fields = BaseSummarySerializer.Meta.fields + (
            "name",
            "fixed_amount",
            "appraisal",
            "appraisal_label",
            "status",
            "status_label",
            "payment_date",
        )
