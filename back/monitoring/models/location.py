from django.db import models


class Department(models.Model):

    code = models.CharField("Código", primary_key=True, max_length=10)
    name = models.CharField("Nombre", max_length=255)

    class Meta:
        db_table = "department"
        verbose_name = "Departamento"
        verbose_name_plural = "Departamentos"

    def __str__(self):
        return self.name


class District(models.Model):

    code = models.CharField("Código", primary_key=True, max_length=10)
    name = models.CharField("Nombre", max_length=255)
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, verbose_name=Department._meta.verbose_name
    )

    class Meta:
        db_table = "district"
        verbose_name = "Distrito"
        verbose_name_plural = "Distritos"

    def __str__(self):
        return self.name


class Locality(models.Model):

    code = models.CharField("Código", primary_key=True, max_length=10)
    name = models.CharField("Nombre", max_length=255)
    department = models.ForeignKey(
        Department, on_delete=models.PROTECT, verbose_name=Department._meta.verbose_name
    )
    district = models.ForeignKey(
        District, on_delete=models.PROTECT, verbose_name=District._meta.verbose_name
    )

    class Meta:
        db_table = "locality"
        verbose_name = "Localidad"
        verbose_name_plural = "Localidades"

    def __str__(self):
        return self.name
