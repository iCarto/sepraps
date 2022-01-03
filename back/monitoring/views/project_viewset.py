from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from monitoring.models.project import Project
from monitoring.serializers.project_serializer import ProjectSerializer
from rest_framework import viewsets


class ProjectFilter(filters.FilterSet):
    status = filters.CharFilter(method="filter_by_status")

    def filter_by_status(self, queryset, name, status):
        if status == "active":
            return queryset.filter(closed=False)

        return queryset

    class Meta:
        model = Project
        fields = ("status",)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter

    def perform_create(self, serializer):
        serializer.validated_data["creation_user"] = self.request.user
        return super().perform_create(serializer)
