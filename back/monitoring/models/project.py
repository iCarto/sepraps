from django.db import models


class Project(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.TextField("Nombre", null=True, max_length=255)
    code = models.TextField("Código", null=True, max_length=30)
    project_type = models.CharField("Tipo de proyecto", max_length=50, null=True)
    project_class = models.CharField("Clase de proyecto", max_length=50, null=True)
    init_date = models.DateTimeField("Fecha de inicio")

    created_at = models.DateTimeField("Fecha de creación", null=True, auto_now_add=True)
    updated_at = models.DateTimeField(
        "Fecha de última modificación", null=True, auto_now=True
    )

    class Meta:
        db_table = "project"
        verbose_name = "Proyecto"
        verbose_name_plural = "Proyectos"

    def __str__(self):
        return self.name
