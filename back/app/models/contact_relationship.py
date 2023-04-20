from django.db import models


class ContactRelationship(models.Model):
    contact = models.ForeignKey("app.Contact", on_delete=models.CASCADE)
    post = models.CharField("Cargo", max_length=50, null=True)

    class Meta(object):
        abstract = True


class ProviderContact(ContactRelationship):
    entity = models.ForeignKey("app.Provider", on_delete=models.CASCADE)

    class Meta(object):
        db_table = "provider_contact"


class ContractorContact(ContactRelationship):
    entity = models.ForeignKey("app.Contractor", on_delete=models.CASCADE)

    class Meta(object):
        db_table = "contractor_contact"


class ConstructionContractContact(ContactRelationship):
    entity = models.ForeignKey(
        "app.ConstructionContract", on_delete=models.CASCADE
    )

    class Meta(object):
        db_table = "construction_contract_contact"
