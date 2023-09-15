from rest_framework import serializers

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseModelWithFolderSerializer,
    BaseSummarySerializer,
)
from app.models.field_report import FieldReport
from app.serializers.field_report_project_serializer import FieldReportProjectSerializer


class FieldReportSerializer(BaseModelWithFolderSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = FieldReport
        fields = BaseModelWithFolderSerializer.Meta.fields + (
            "name",
            "code",
            "date",
            "visit_date_start",
            "visit_date_end",
            "reporting_person",
            "reported_persons",
            "participant_persons",
            "report_comments_start",
            "report_comments_end",
            "goals",
            "field_report_projects",
        )

        extra_kwargs = {"goals": {"allow_null": True}}

    field_report_projects = FieldReportProjectSerializer(read_only=True, many=True)


class FieldReportSummarySerializer(BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = FieldReport
        fields = BaseSummarySerializer.Meta.fields + (
            "name",
            "code",
            "date",
            "reporting_person",
            "project_list",
            "contract_list",
        )

    project_list = serializers.SerializerMethodField()
    contract_list = serializers.SerializerMethodField()

    def get_project_list(self, obj):  # noqa: WPS615
        return (
            {
                "id": field_report_project.project.id,
                "label": field_report_project.project.code,
            }
            for field_report_project in obj.field_report_projects.all()
        )

    def get_contract_list(self, obj):  # noqa: WPS615
        contract_list = (
            {
                "id": field_report_project.project.construction_contract.id,
                "label": field_report_project.project.construction_contract.number,
            }
            for field_report_project in obj.field_report_projects.all()
        )
        return [
            dict(t) for t in {tuple(d.items()) for d in contract_list}
        ]  # remove duplicates
