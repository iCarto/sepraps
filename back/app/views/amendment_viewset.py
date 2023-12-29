from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.amendment import Amendment
from app.serializers.amendment_serializer import (
    AmendmentSerializer,
    AmendmentSummarySerializer,
)


class AmendmentViewSet(ModelListAuditViewSet):
    queryset = Amendment.objects.all()
    serializer_class = AmendmentSerializer
    summary_serializer_class = AmendmentSummarySerializer
