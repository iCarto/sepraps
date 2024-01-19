from django.contrib.auth.models import AbstractUser

from users.constants import GROUP_ADMIN


class User(AbstractUser):
    class Meta(object):
        ordering = ("username",)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    def in_admin_group(self):
        return self.groups.filter(name=GROUP_ADMIN).exists()

    def in_group(self, group):
        return self.groups.filter(name=group).exists()

    def belongs_to(self, groups):
        return self.groups.filter(name__in=groups).exists()
