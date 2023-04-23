import json

from django.conf import settings
from monitoring.models.milestone import Milestone, create_project_milestones
from monitoring.models.project import Project


Milestone.objects.all().delete()
projects = Project.objects.all()

for project in projects:
    data = {}
    data_path = os.path.join(settings.BASE_DIR, "app", "data", "project", f"{instance.project_type}.json")
    with open(data_path) as f:
        data = json.load(f)
        # settings.MONITORING_TEMPLATES_FOLDER
        # + "/project/"
        # + instance.project_type
        # + ".json",

    create_project_milestones(project, data.get("milestones", []))
