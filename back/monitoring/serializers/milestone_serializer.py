from monitoring.models.milestone import Milestone
from rest_framework import serializers


class MilestoneSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    phase_name = serializers.SerializerMethodField()

    class Meta:
        model = Milestone
        fields = (
            "id",
            "category",
            "category_name",
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

    def get_category_name(self, obj):
        return obj.get_category_name()

    def get_phase_name(self, obj):
        return obj.get_phase_name()
