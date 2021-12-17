from django_filters.rest_framework import DjangoFilterBackend
from monitoring.models.project import Project
from monitoring.serializers.project_serializer import ProjectSerializer
from rest_framework import viewsets


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend]

    def perform_create(self, serializer):
        serializer.validated_data["creation_user"] = self.request.user
        return super().perform_create(serializer)
