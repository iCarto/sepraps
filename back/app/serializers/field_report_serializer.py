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

    field_report_projects = FieldReportProjectSerializer(read_only=True, many=True)


class FieldReportSummarySerializer(BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = FieldReport
        fields = BaseSummarySerializer.Meta.fields + (
            "name",
            "code",
            "date",
            "reporting_person",
        )
