from django.urls import include, path
from rest_framework import routers

from questionnaires.views.monthly_questionnaire_instance_viewset import (
    MonthlyQuestionnaireInstanceView,
)
from questionnaires.views.questionnaire_viewset import QuestionnaireView


router = routers.DefaultRouter(trailing_slash=False)
router.register(r"questionnaires", QuestionnaireView)
router.register(r"monthly_questionnaires_instances", MonthlyQuestionnaireInstanceView)


urlpatterns = [path("", include(router.urls))]
