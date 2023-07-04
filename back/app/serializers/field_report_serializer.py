from app.models.field_report import FieldReport
from domains.mixins import BaseDomainMixin

from app.base.serializers.base_serializers import (
    BaseModelSerializer,
    BaseSummarySerializer,
)


class FieldReportSerializer(BaseDomainMixin, BaseModelSerializer):
    class Meta(BaseModelSerializer.Meta):
        model = FieldReport
        fields = BaseModelSerializer.Meta.fields + (
            "name",
            "code",
            "date",
            "visit_date_start",
            "visit_date_end",
            "reporting_person_name",
            "reporting_person_role",
            "reporting_person_department",
            "report_comments_start",
            "report_comments_end",
            "goals",
        )


class FieldReportSummarySerializer(BaseDomainMixin, BaseSummarySerializer):
    class Meta(BaseSummarySerializer.Meta):
        model = FieldReport
        fields = BaseSummarySerializer.Meta.fields + (
            "name",
            "code",
            "date",
            "reporting_person_name",
            "reporting_person_role",
        )
