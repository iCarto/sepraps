from django.contrib.auth import get_user_model
from django.db import models


class BaseModel(models.Model):
    class Meta(object):
        abstract = True

    id = models.AutoField(primary_key=True, unique=True, editable=False)

    def __str__(self):
        return "{0}: {1}".format(self.__class__.__name__, self.id)

    def __repr__(self):
        return "{classname}({attributes!r})".format(
            classname=self.__class__.__name__, attributes=self.__dict__
        )


class BaseTimestampedModel(models.Model):
    class Meta(object):
        abstract = True

    created_at = models.DateTimeField(null=True, auto_now_add=True)
    updated_at = models.DateTimeField(null=True, auto_now=True)


class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(active=True)


class BaseUserTrackedModel(models.Model):
    class Meta(object):
        abstract = True

    active = models.BooleanField(null=False, default=True)
    created_by = models.ForeignKey(
        get_user_model(), on_delete=models.PROTECT, related_name="created_by+"
    )
    updated_by = models.ForeignKey(
        get_user_model(), on_delete=models.PROTECT, related_name="updated_by+"
    )


class BaseEntityModelMixin(
    BaseTimestampedModel, BaseUserTrackedModel, BaseModel
):  # noqa: WPS215
    class Meta(object):
        abstract = True
