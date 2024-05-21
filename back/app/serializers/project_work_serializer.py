from rest_framework import serializers

from app.models.project_work import ProjectWork
from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices


class ProjectWorkSerializer(BaseDomainMixin, serializers.ModelSerializer):
    class Meta(object):
        model = ProjectWork
        fields = ("work_type", "work_type_label", "work_class", "create_components")

    work_type_label = serializers.SerializerMethodField()
    create_components = serializers.BooleanField(write_only=True, required=False)

    domain_fields = (
        BaseDomainField("work_class", DomainCategoryChoices.project_class),
    )

    def get_work_type_label(self, instance):
        return instance.work_type.value
