from app.models.field_report_project_activity import FieldReportProjectActivity
from documents.models import MediaNode


activity = FieldReportProjectActivity.objects.get(pk=2)
document = MediaNode.objects.get(pk=181)
activity.image1 = document
document = MediaNode.objects.get(pk=182)
activity.image2 = document
document = MediaNode.objects.get(pk=183)
activity.image3 = document
document = MediaNode.objects.get(pk=184)
activity.image4 = document
activity.save()

activity = FieldReportProjectActivity.objects.get(pk=3)
document = MediaNode.objects.get(pk=185)
activity.image1 = document
document = MediaNode.objects.get(pk=186)
activity.image2 = document
activity.save()
