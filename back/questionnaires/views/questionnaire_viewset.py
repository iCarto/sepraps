from rest_framework import viewsets

from questionnaires.models.questionnaire import Questionnaire
from questionnaires.serializers.questionnaire_serializer import QuestionnaireSerializer


class QuestionnaireView(viewsets.ModelViewSet):
    serializer_class = QuestionnaireSerializer
    queryset = Questionnaire.objects.all()
