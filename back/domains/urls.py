from django.urls import include, path
from domains.views import DomainEntryViewSet
from rest_framework import routers


router = routers.DefaultRouter(trailing_slash=False)
router.register("domains", DomainEntryViewSet)

urlpatterns = [path("", include(router.urls))]
