from django.db import models

from app.base.models.base_models import ActiveManager, BaseEntityModelMixin
from app.models.comment import Comment
from documents.base.base_models import BaseDocumentModel


class Certification(BaseDocumentModel, BaseEntityModelMixin):
    class Meta(object):
        db_table = "certification"
        verbose_name = "Certificación"
        verbose_name_plural = "Certificaciones"

    objects = ActiveManager()

    expected_amount = models.DecimalField(
        "Monto previsto", max_digits=20, decimal_places=2, null=True
    )
    approved_amount = models.DecimalField(
        "Monto aprobado", max_digits=20, decimal_places=2, null=False
    )
    notes = models.TextField("Observaciones", max_length=500, null=True)

    payment = models.ForeignKey(
        "Payment", on_delete=models.CASCADE, related_name="payment_certifications"
    )
    project = models.ForeignKey(
        "Project", on_delete=models.CASCADE, related_name="project_certifications"
    )
    comments = models.ManyToManyField(Comment)
