from django.contrib.auth.models import Group
from rest_framework import viewsets
from rest_framework.permissions import BasePermission
from users.models import User
from users.serializers import GroupSerializer, UserSerializer


class IsInAdminGroupUser(BasePermission):
    def has_permission(self, request, view):
        user: User = request.user
        return (
            user and user.is_authenticated and (user.in_admin_group() or user.is_staff)
        )


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsInAdminGroupUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = [IsInAdminGroupUser]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
