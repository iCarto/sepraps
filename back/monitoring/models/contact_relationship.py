from django.db import models


class ContactRelationship(models.Model):
    contact = models.ForeignKey("monitoring.Contact", on_delete=models.CASCADE)
    post = models.CharField("Cargo", max_length=50, null=True)

    class Meta:
        abstract = True


class ProviderContact(ContactRelationship):

    entity = models.ForeignKey("monitoring.Provider", on_delete=models.CASCADE)

    class Meta:
        db_table = "provider_contact"


class ContractorContact(ContactRelationship):

    entity = models.ForeignKey("monitoring.Contractor", on_delete=models.CASCADE)

    class Meta:
        db_table = "contractor_contact"
