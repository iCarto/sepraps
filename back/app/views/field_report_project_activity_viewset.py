from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.field_report_project_activity import FieldReportProjectActivity
from app.serializers.field_report_project_activity_serializer import (
    FieldReportProjectActivitySerializer,
)


class FieldReportProjectActivityViewSet(ModelListAuditViewSet):
    queryset = FieldReportProjectActivity.objects.all()
    serializer_class = FieldReportProjectActivitySerializer
