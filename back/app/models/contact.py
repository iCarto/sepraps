from django.contrib.auth import get_user_model
from django.db import models


# TODO: Review gender options
GENDER_CHOICES = [
    ("M", "Masculino"),
    ("F", "Femenino"),
    ("OS", "Otro específico"),
    ("NK", "No conocido"),
    ("NS", "No especificado"),
]


class Contact(models.Model):
    class Meta(object):
        db_table = "contact"
        verbose_name = "Contacto"
        verbose_name_plural = "Contactos"

    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", max_length=255)
    post = models.CharField("Cargo", max_length=50, null=True)
    gender = models.CharField("Género", max_length=2, choices=GENDER_CHOICES)
    ci_number = models.IntegerField("Número CI", null=True)
    phone = models.CharField("Celular", max_length=20, null=True)
    email = models.CharField("E-mail", max_length=255, null=True)
    comments = models.TextField("Observaciones", max_length=500, null=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT, null=True)

    def __str__(self):
        return self.name

    def get_gender_name(self):
        return dict(GENDER_CHOICES).get(self.gender, self.gender)
