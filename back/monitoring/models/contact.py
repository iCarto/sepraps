from django.db import models


# TODO: Review gender options
GENDER_CHOICES = [
    ("M", "Hombre"),
    ("F", "Mujer"),
    ("OS", "Otra específica"),
    ("NK", "No conocida"),
    ("NS", "No especificada"),
]


class Contact(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.CharField("Nombre", max_length=255)
    post = models.CharField("Cargo", max_length=50, null=True)
    gender = models.CharField("Género", max_length=2, choices=GENDER_CHOICES)
    phone = models.CharField("Teléfono", max_length=20)
    email = models.CharField("Correo electrónico", max_length=255)
    comments = models.TextField("Observaciones", max_length=500)
    is_staff = models.BooleanField(blank=False, null=False, default=False)

    class Meta:
        db_table = "contact"
        verbose_name = "Contacto"
        verbose_name_plural = "Contactos"

    def __str__(self):
        return self.name
