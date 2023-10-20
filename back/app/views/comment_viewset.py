from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.comment import Comment
from app.serializers.comment_serializer import CommentSerializer


class CommentViewSet(ModelListAuditViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
