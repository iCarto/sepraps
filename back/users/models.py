from django.contrib.auth.models import AbstractUser
from users.constants import GROUP_ADMIN


class User(AbstractUser):
    class Meta(object):
        ordering = ("username",)

    USERNAME_FIELD = "username"  # noqa: WPS115
    REQUIRED_FIELDS = []  # noqa: WPS115

    def in_admin_group(self):
        return self.groups.filter(name=GROUP_ADMIN).exists()

    def is_member(self, group):
        return self.groups.filter(name=group).exists()
