from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.payment import Payment
from app.serializers.payment_serializer import (
    PaymentSerializer,
    PaymentSummarySerializer,
)


class PaymentViewSet(ModelListAuditViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    summary_serializer_class = PaymentSummarySerializer
