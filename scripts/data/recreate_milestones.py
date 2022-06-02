import json

from django.conf import settings
from monitoring.models.milestone import Milestone, create_project_milestones
from monitoring.models.project import Project


Milestone.objects.all().delete()
projects = Project.objects.all()

for project in projects:

    data = {}
    with open(
        settings.MONITORING_TEMPLATES_FOLDER
        + "/project/"
        + project.project_type
        + ".json",
        "r",
    ) as f:
        data = json.load(f)

    create_project_milestones(project, data.get("milestones", []))
