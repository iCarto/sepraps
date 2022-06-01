from questionnaires.models.questionnaire import Questionnaire
from rest_framework import serializers


class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Questionnaire
        fields = "__all__"


class QuestionnaireShortSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Questionnaire
        fields = ("code", "name", "fields")

    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields
