from app.models.field_report_project_activity import FieldReportProjectActivity
from documents.models import MediaNode


activity = FieldReportProjectActivity.objects.get(pk=2)
document = MediaNode.objects.get(pk=179)
activity.image1 = document
document = MediaNode.objects.get(pk=180)
activity.image2 = document
document = MediaNode.objects.get(pk=181)
activity.image3 = document
document = MediaNode.objects.get(pk=182)
activity.image4 = document
activity.save()

activity = FieldReportProjectActivity.objects.get(pk=3)
document = MediaNode.objects.get(pk=183)
activity.image1 = document
document = MediaNode.objects.get(pk=184)
activity.image2 = document
activity.save()

activity = FieldReportProjectActivity.objects.get(pk=5)
document = MediaNode.objects.get(pk=189)
activity.image1 = document
document = MediaNode.objects.get(pk=190)
activity.image2 = document
document = MediaNode.objects.get(pk=191)
activity.image3 = document
document = MediaNode.objects.get(pk=192)
activity.image4 = document
activity.save()

activity = FieldReportProjectActivity.objects.get(pk=6)
document = MediaNode.objects.get(pk=193)
activity.image1 = document
document = MediaNode.objects.get(pk=194)
activity.image2 = document
document = MediaNode.objects.get(pk=195)
activity.image3 = document
document = MediaNode.objects.get(pk=196)
activity.image4 = document
activity.save()

activity = FieldReportProjectActivity.objects.get(pk=7)
document = MediaNode.objects.get(pk=203)
activity.image1 = document
document = MediaNode.objects.get(pk=204)
activity.image2 = document
document = MediaNode.objects.get(pk=205)
activity.image3 = document
document = MediaNode.objects.get(pk=206)
activity.image4 = document
activity.save()
