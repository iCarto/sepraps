from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.field_report_project import FieldReportProject
from app.serializers.field_report_project_serializer import FieldReportProjectSerializer


class FieldReportProjectViewSet(ModelListAuditViewSet):
    queryset = FieldReportProject.objects.all()
    serializer_class = FieldReportProjectSerializer
