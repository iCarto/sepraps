from rest_framework import viewsets

from app.models.project_work_type import ProjectWorkType
from app.serializers.project_work_type_serializer import ProjectWorkTypeSerializer


class ProjectWorkTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProjectWorkType.objects.all().order_by("value")
    serializer_class = ProjectWorkTypeSerializer
