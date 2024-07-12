from app.models.project import Project
from documents.models import MediaNode


projects_images = [
    {"project_id": 1, "document_id": 389},
    {"project_id": 2, "document_id": 396},
    {"project_id": 3, "document_id": 402},
    {"project_id": 4, "document_id": 405},
    {"project_id": 18, "document_id": 412},
    {"project_id": 25, "document_id": 417},
]

for project_image in projects_images:
    project = Project.objects.get(pk=project_image["project_id"])
    document = MediaNode.objects.get(pk=project_image["document_id"])
    project.featured_image = document
    project.save()
