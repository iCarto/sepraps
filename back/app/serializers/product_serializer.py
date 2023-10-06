from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
)
from app.models.product import Product


class ProductSerializer(BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Product
        fields = BaseModelWithFolderSerializer.Meta.fields + (
            "name",
            "status",
            "status_label",
            "presentation_date",
            "payment",
        )

    status_label = serializers.SerializerMethodField()

    def get_status_label(self, obj):  # noqa: WPS615
        return obj.get_status_label()
