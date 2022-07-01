from django.db import models


class ProviderContact(models.Model):

    provider = models.ForeignKey("monitoring.Provider", on_delete=models.CASCADE)
    contact = models.ForeignKey("monitoring.Contact", on_delete=models.CASCADE)
    post = models.CharField("Cargo", max_length=50, null=True)

    class Meta:
        db_table = "provider_contact"
