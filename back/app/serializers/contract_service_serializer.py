from domains.mixins import BaseDomainMixin

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
)
from app.models.contract_service import ContractService


class ContractServiceSerializer(BaseDomainMixin, BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = ContractService
        fields = BaseModelWithFolderSerializer.Meta.fields + ("code", "name")
