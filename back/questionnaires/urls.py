from django.urls import include, path
from questionnaires.views import QuestionnaireView
from rest_framework import routers


router = routers.DefaultRouter(trailing_slash=False)
router.register(r"questionnaires", QuestionnaireView)


urlpatterns = [path("", include(router.urls))]
