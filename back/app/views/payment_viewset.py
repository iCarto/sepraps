from django.db.models.functions import Coalesce
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.payment import Payment
from app.serializers.comment_serializer import CommentSerializer
from app.serializers.payment_serializer import (
    PaymentSerializer,
    PaymentSummarySerializer,
)


class PaymentViewSet(ModelListAuditViewSet):
    queryset = Payment.objects.annotate(
        payment_date=Coalesce("approval_date", "expected_approval_date")
    ).order_by("payment_date")
    serializer_class = PaymentSerializer
    summary_serializer_class = PaymentSummarySerializer

    @action(
        methods=["POST"], detail=True, url_path="comments", url_name="payment_comments"
    )
    def save_payment_comment(self, request, pk):
        payment = self.get_object()
        if payment:
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                comment = serializer.save(
                    created_by=request.user, updated_by=request.user
                )
                payment.comments.add(comment)
                return Response(CommentSerializer(comment).data)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)
