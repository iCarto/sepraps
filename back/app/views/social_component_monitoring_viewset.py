from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.social_component_monitoring import SocialComponentMonitoring
from app.models.social_component_training import SocialComponentTraining
from app.serializers.comment_serializer import CommentSerializer
from app.serializers.social_component_monitoring_serializer import (
    SocialComponentMonitoringSerializer,
)
from app.serializers.social_component_training_serializer import (
    SocialComponentTrainingSerializer,
)


class SocialComponentMonitoringViewSet(ModelListAuditViewSet):
    queryset = SocialComponentMonitoring.objects.all()
    serializer_class = SocialComponentMonitoringSerializer

    @action(
        methods=["POST"],
        detail=True,
        url_path="comments",
        url_name="social_component_monitoring_comments",
    )
    def save_building_component_monitoring_social(self, request, pk):
        sc_monitoring = self.get_object()
        if sc_monitoring:
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                comment = serializer.save(
                    created_by=request.user, updated_by=request.user
                )
                sc_monitoring.comments.add(comment)
                return Response(CommentSerializer(comment).data)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=["GET", "POST"],
        detail=True,
        url_path="socialcomponenttrainings",
        url_name="social_component_monitoring_trainings",
    )
    def save_social_component_monitoring_training(self, request, pk):
        if request.method == "POST":
            sc_monitoring = self.get_object()
            if sc_monitoring:
                serializer = SocialComponentTrainingSerializer(data=request.data)
                if serializer.is_valid():
                    sc_training = serializer.save(
                        social_component_monitoring=sc_monitoring,
                        created_by=request.user,
                        updated_by=request.user,
                    )
                    return Response(SocialComponentTrainingSerializer(sc_training).data)

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == "GET":
            return Response(
                SocialComponentTrainingSerializer(
                    SocialComponentTraining.objects.filter(
                        social_component_monitoring=pk
                    ).order_by("id"),
                    many=True,
                ).data
            )

        return Response(status=status.HTTP_400_BAD_REQUEST)
