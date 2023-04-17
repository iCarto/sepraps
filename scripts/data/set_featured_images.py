from app.models.project import Project
from documents.models import MediaNode


projects_images = [
    {"project_id": 18, "document_id": 140},
    {"project_id": 19, "document_id": 145},
    {"project_id": 20, "document_id": 152},
    {"project_id": 21, "document_id": 161},
    {"project_id": 22, "document_id": 164},
    {"project_id": 23, "document_id": 167},
]

for project_image in projects_images:
    project = Project.objects.get(pk=project_image["project_id"])
    document = MediaNode.objects.get(pk=project_image["document_id"])
    project.featured_image = document
    project.save()
