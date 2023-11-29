from django.db import models


class ContractProject(models.Model):
    class Meta(object):
        db_table = "contract_project"

    contract = models.ForeignKey(
        "ConstructionContract",
        on_delete=models.CASCADE,
        related_name="related_projects",
    )
    project = models.ForeignKey(
        "Project", on_delete=models.CASCADE, related_name="related_contracts"
    )
    construction = models.BooleanField(blank=False, null=False, default=False)
