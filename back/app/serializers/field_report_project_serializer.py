from rest_framework import serializers

from app.base.serializers.base_serializers import BaseModelSerializer
from app.models.field_report_project import FieldReportProject
from app.models.project import Project
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
            "field_report",
            "field_report_project_activities",
        )

    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())
    construction_contract_number = serializers.CharField(
        source="project.construction_contract.number", default=None, read_only=True
    )
    field_report_project_activities = serializers.SerializerMethodField()

    def get_field_report_project_activities(self, instance):
        activities = instance.field_report_project_activities.all().order_by(
            "date", "id"
        )
        return FieldReportProjectActivitySerializer(
            activities, read_only=True, many=True, context=self.context
        ).data

    def to_representation(self, instance):
        response = super().to_representation(instance)
        if "project" in response:
            response["project"] = ProjectShortSerializer(
                instance.project, context=self.context
            ).data
        return response
