from django.urls import include, path
from rest_framework import routers

from domains.views import DomainEntryViewSet


router = routers.DefaultRouter(trailing_slash=False)
router.register("domains", DomainEntryViewSet)

urlpatterns = [path("", include(router.urls))]
