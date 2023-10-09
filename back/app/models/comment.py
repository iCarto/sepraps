from django.db import models

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin


class Comment(BaseEntityModelMixin):
    class Meta(object):
        db_table = "comment"
        verbose_name = "Comentario"
        verbose_name_plural = "Comentarios"

    objects = ActiveManager()

    id = models.AutoField(primary_key=True)
    text = models.TextField("Texto")
