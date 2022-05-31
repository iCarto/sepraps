from django.contrib.auth.models import Group
from rest_framework.permissions import BasePermission


class GroupBasePermission(BasePermission):

    group_name = ""

    def has_permission(self, request, view):
        try:
            request.user.groups.get(name=self.group_name)
            return True
        except Group.DoesNotExist:
            return False

        return False


class GestionPermission(GroupBasePermission):

    group_name = "gestion"


class EdicionPermission(GroupBasePermission):

    group_name = "edicion"


class VisualizacionPermission(GroupBasePermission):

    group_name = "visualizacion"


class SupervisionPermission(GroupBasePermission):

    group_name = "supervision"
