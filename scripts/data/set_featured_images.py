from app.models.project import Project
from documents.models import MediaNode


projects_images = [
    {"project_id": 18, "document_id": 125},
    {"project_id": 19, "document_id": 130},
    {"project_id": 20, "document_id": 132},
    {"project_id": 21, "document_id": 139},
    {"project_id": 22, "document_id": 146},
    {"project_id": 23, "document_id": 155},
]

for project_image in projects_images:
    project = Project.objects.get(pk=project_image["project_id"])
    document = MediaNode.objects.get(pk=project_image["document_id"])
    project.featured_image = document
    project.save()
