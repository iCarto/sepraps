from django.urls import path
from rest_framework_simplejwt import serializers, views


class TokenObtainPairSerializer(serializers.TokenObtainPairSerializer):
    """Serializer to obtain custom token with user info and groups."""

    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     # Add custom claims
    #     token["username"] = user.username
    #     token["first_name"] = user.first_name
    #     token["last_name"] = user.last_name
    #     groups = user.groups.values_list("name", flat=True)
    #     token["groups"] = list(groups)

    #     return token


# Default viewset for JWT token generater on user request
class TokenObtainPairView(views.TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer


urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", views.TokenRefreshView.as_view(), name="token_refresh"),
]
