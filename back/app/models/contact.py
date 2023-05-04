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
    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", max_length=255)
    post = models.CharField("Cargo", max_length=50, null=True)
    gender = models.CharField("Género", max_length=2, choices=GENDER_CHOICES)
    phone = models.CharField("Celular", max_length=20)
    email = models.CharField("E-mail", max_length=255)
    comments = models.TextField("Observaciones", max_length=500)
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT, null=True)

    class Meta(object):
        db_table = "contact"
        verbose_name = "Contacto"
        verbose_name_plural = "Contactos"

    def get_gender_name(self):
        return dict(GENDER_CHOICES).get(self.gender, self.gender)

    def __str__(self):
        return self.name
