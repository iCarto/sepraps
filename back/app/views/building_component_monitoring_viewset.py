from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.building_component_monitoring import BuildingComponentMonitoring
from app.serializers.building_component_monitoring_serializer import (
    BuildingComponentMonitoringSerializer,
)
from app.serializers.comment_serializer import CommentSerializer


class BuildingComponentMonitoringViewSet(ModelListAuditViewSet):
    queryset = BuildingComponentMonitoring.objects.all()
    serializer_class = BuildingComponentMonitoringSerializer

    @action(
        methods=["POST"],
        detail=True,
        url_path="comments",
        url_name="building_component_monitoring_comments",
    )
    def save_building_component_monitoring_comment(self, request, pk):
        bc_monitoring = self.get_object()
        if bc_monitoring:
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                comment = serializer.save(
                    created_by=request.user, updated_by=request.user
                )
                bc_monitoring.comments.add(comment)
                return Response(CommentSerializer(comment).data)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)
