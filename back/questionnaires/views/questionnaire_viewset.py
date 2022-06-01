from questionnaires.models.questionnaire import Questionnaire
from questionnaires.serializers.questionnaire_serializer import QuestionnaireSerializer
from rest_framework import viewsets


class QuestionnaireView(viewsets.ModelViewSet):
    serializer_class = QuestionnaireSerializer
    queryset = Questionnaire.objects.all()
