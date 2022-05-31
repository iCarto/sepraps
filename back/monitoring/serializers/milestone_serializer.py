from monitoring.models.milestone import Milestone
from rest_framework import serializers


class MilestoneSerializer(serializers.ModelSerializer):
    phase_name = serializers.SerializerMethodField()

    class Meta:
        model = Milestone
        fields = (
            "id",
            "code",
            "name",
            "checklist",
            "phase",
            "phase_name",
            "compliance_date",
            "ordering",
        )

    def get_fields(self):
        fields = super(MilestoneSerializer, self).get_fields()
        fields["children"] = MilestoneSerializer(
            many=True, read_only=True, required=False
        )
        return fields

    def get_phase_name(self, obj):
        return obj.get_phase_name()


class MilestoneSummarySerializer(MilestoneSerializer):
    class Meta(MilestoneSerializer.Meta):
        fields = ("code", "name", "phase", "phase_name", "compliance_date")

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        del fields["children"]
        for field in fields:
            if field != "id":
                fields[field].read_only = True
        return fields
