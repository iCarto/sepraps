from datetime import datetime

from app.models.milestone import Milestone
from app.models.project import Project


projects = Project.objects.all()

for project in projects:
    project_milestones = (
        Milestone.objects.exclude(parent__isnull=False)
        .filter(project__id=project.id)
        .order_by("ordering")
    )
    milestones_completed_number = project.id % 11
    for x in range(milestones_completed_number):
        compliance_date = datetime.now()
        milestone = project_milestones[x]
        milestone.compliance_date = compliance_date
        milestone_children = milestone.children.all()
        if milestone_children:
            for milestone_child in milestone_children:
                milestone_child.compliance_date = compliance_date
                milestone_child.save()
        milestone.save()
