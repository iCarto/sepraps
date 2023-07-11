from rest_framework import serializers

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
            "construction_contract_number",
            "agreements",
            "field_report_project_activities",
        )

    project = ProjectShortSerializer()
    construction_contract_number = serializers.CharField(
        source="project.construction_contract.number", default=None
    )
    field_report_project_activities = FieldReportProjectActivitySerializer(
        read_only=True, many=True
    )
