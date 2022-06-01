from monitoring.models.project import Project
from monitoring.models.project_questionnaire_instance import (
    ProjectQuestionnaireInstance,
)
from questionnaires.serializers.monthly_questionnaire_instance_serializer import (
    MonthlyQuestionnaireInstanceSerializer,
)
from questionnaires.serializers.questionnaire_serializer import QuestionnaireSerializer
from rest_framework import serializers


class ProjectQuestionnaireInstanceSerializer(serializers.ModelSerializer):

    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())
    questionnaire = QuestionnaireSerializer(read_only=True)
    questionnaire_instances = MonthlyQuestionnaireInstanceSerializer(many=True)

    class Meta:
        model = ProjectQuestionnaireInstance
        fields = ("project", "questionnaire", "questionnaire_instances")

    def update(self, instance, validated_data):

        # calling to MonthlyQuestionnaireInstanceListSerializer.update() we can make all modifications
        # for instances inside the questionnaire
        old_instances_ids = [
            instance.id for instance in instance.get("questionnaire_instances")
        ]

        questionnaire_instances = self.fields["questionnaire_instances"].update(
            instance.get("questionnaire_instances"),
            validated_data.pop("questionnaire_instances", None),
        )
        new_instances_ids = [instance.id for instance in questionnaire_instances]

        # Delete old instances that are not in new list
        for questionnaire_instance in instance.get("questionnaire_instances"):
            if (
                questionnaire_instance.id in old_instances_ids
                and questionnaire_instance.id not in new_instances_ids
            ):
                questionnaire_instance.delete()

        # Add new instances for project
        for questionnaire_instance in questionnaire_instances:
            if (
                questionnaire_instance.id not in old_instances_ids
                and questionnaire_instance.id in new_instances_ids
            ):
                project_questionnaire_instance = ProjectQuestionnaireInstance(
                    project=instance.get("project"),
                    questionnaire_instance=questionnaire_instance,
                    questionnaire=instance.get("questionnaire"),
                )
                project_questionnaire_instance.save()

        return instance
