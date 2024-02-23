from rest_framework import serializers

from app.models.project_work import ProjectWork
from domains.mixins import BaseDomainField, BaseDomainMixin
from domains.models import DomainCategoryChoices


class ProjectWorkSerializer(BaseDomainMixin, serializers.ModelSerializer):
    class Meta(object):
        model = ProjectWork
        fields = ("work_type", "work_class")

    domain_fields = (
        BaseDomainField("work_type", DomainCategoryChoices.project_type),
        BaseDomainField("work_class", DomainCategoryChoices.project_class),
    )
