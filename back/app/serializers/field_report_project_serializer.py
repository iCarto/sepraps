from app.base.serializers.base_serializers import BaseModelSerializer
from app.models.field_report_project import FieldReportProject
from app.serializers.field_report_project_activity_serializer import (
    FieldReportProjectActivitySerializer,
)
from app.serializers.project_serializer import ProjectShortSerializer


class FieldReportProjectSerializer(BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = FieldReportProject
        fields = BaseModelSerializer.Meta.fields + (
            "history",
            "project",
            "field_report_project_activities",
        )

    project = ProjectShortSerializer()
    field_report_project_activities = FieldReportProjectActivitySerializer(
        read_only=True, many=True
    )
