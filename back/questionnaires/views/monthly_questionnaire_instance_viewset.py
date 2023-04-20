from rest_framework import viewsets

from questionnaires.models.monthly_questionnaire_instance import (
    MonthlyQuestionnaireInstance,
)
from questionnaires.serializers.monthly_questionnaire_instance_serializer import (
    MonthlyQuestionnaireInstanceSerializer,
)


class MonthlyQuestionnaireInstanceView(viewsets.ModelViewSet):
    serializer_class = MonthlyQuestionnaireInstanceSerializer
    queryset = MonthlyQuestionnaireInstance.objects.prefetch_related("values")
