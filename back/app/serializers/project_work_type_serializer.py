from rest_framework import serializers

from app.models.project_work_type import ProjectWorkType


class ProjectWorkTypeSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = ProjectWorkType
        fields = ("key", "value")
