from django.urls import include, path
from rest_framework import routers

from users import jwt
from users.api import GroupViewSet, UserViewSet


router = routers.DefaultRouter(trailing_slash=False)
router.register(r"users", UserViewSet)
router.register(r"groups", GroupViewSet)

urlpatterns = [path("", include(router.urls))] + jwt.urlpatterns
