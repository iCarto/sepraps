from django.db import models

from app.models.project import Project
from questionnaires.models.monthly_questionnaire_instance import (
    MonthlyQuestionnaireInstance,
)
from questionnaires.models.questionnaire import Questionnaire


class ProjectQuestionnaireInstance(models.Model):
    project = models.ForeignKey(Project, on_delete=models.PROTECT)
    questionnaire_instance = models.ForeignKey(
        MonthlyQuestionnaireInstance, on_delete=models.CASCADE
    )
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.PROTECT)

    class Meta(object):
        db_table = "project_questionnaire_instance"
