from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
)
from app.models.product import Product


class ProductSerializer(BaseDomainMixin, BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = Product
        fields = BaseModelWithFolderSerializer.Meta.fields + (
            "name",
            "status",
            "product_date",
            "payment",
        )

    domain_fields = [BaseDomainField("status", DomainCategoryChoices.product_status)]
