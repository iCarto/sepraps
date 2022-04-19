from questionnaires.models import Questionnaire
from questionnaires.serializers import QuestionnaireSerializer
from rest_framework import viewsets


class QuestionnaireView(viewsets.ModelViewSet):
    serializer_class = QuestionnaireSerializer
    queryset = Questionnaire.objects.all()
