from django.db.models.functions import Coalesce
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.certification import Certification
from app.serializers.certification_serializer import (
    CertificationSerializer,
    CertificationSummarySerializer,
)
from app.serializers.comment_serializer import CommentSerializer


class CertificationViewSet(ModelListAuditViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    summary_serializer_class = CertificationSummarySerializer

    def get_queryset(self):
        return (
            self.queryset.select_related("payment", "project")
            .prefetch_related("comments")
            .annotate(
                approval_date=Coalesce(
                    "payment__approval_date", "payment__expected_approval_date"
                )
            )
            .order_by("approval_date")
        )

    @action(
        methods=["POST"],
        detail=True,
        url_path="comments",
        url_name="certification_comments",
    )
    def save_certification_comment(self, request, pk):
        certification = self.get_object()
        if certification:
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                comment = serializer.save(
                    created_by=request.user, updated_by=request.user
                )
                certification.comments.add(comment)
                return Response(CommentSerializer(comment).data)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)
