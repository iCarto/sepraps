from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.connection import Connection
from app.serializers.comment_serializer import CommentSerializer
from app.serializers.connection_serializer import ConnectionSerializer


class ConnectionViewSet(ModelListAuditViewSet):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer

    @action(
        methods=["POST"],
        detail=True,
        url_path="comments",
        url_name="connection_comments",
    )
    def save_connection_comment(self, request, pk):
        connection = self.get_object()
        if connection:
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                comment = serializer.save(
                    created_by=request.user, updated_by=request.user
                )
                connection.comments.add(comment)
                return Response(CommentSerializer(comment).data)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)
