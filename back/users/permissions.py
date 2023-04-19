from django.contrib.auth.models import Group
from rest_framework.permissions import BasePermission
from users.constants import (
    GROUP_EDICION,
    GROUP_GESTION,
    GROUP_SUPERVISION,
    GROUP_VISUALIZACION,
)


class GroupBasePermission(BasePermission):
    group_name = ""

    def has_permission(self, request, view):
        return request.user.in_group(self.group_name)


class VisualizacionPermission(GroupBasePermission):
    group_name = GROUP_VISUALIZACION


class EdicionPermission(GroupBasePermission):
    group_name = GROUP_EDICION


class GestionPermission(GroupBasePermission):
    group_name = GROUP_GESTION


class SupervisionPermission(GroupBasePermission):
    group_name = GROUP_SUPERVISION
