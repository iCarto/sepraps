from app.models.field_report_project_activity import FieldReportProjectActivity
from documents.models import MediaNode


activity = FieldReportProjectActivity.objects.get(pk=2)
document = MediaNode.objects.get(pk=269)
activity.image1 = document
document = MediaNode.objects.get(pk=270)
activity.image2 = document
document = MediaNode.objects.get(pk=271)
activity.image3 = document
document = MediaNode.objects.get(pk=272)
activity.image4 = document
activity.save()

activity = FieldReportProjectActivity.objects.get(pk=3)
document = MediaNode.objects.get(pk=273)
activity.image1 = document
document = MediaNode.objects.get(pk=274)
activity.image2 = document
activity.save()

activity = FieldReportProjectActivity.objects.get(pk=5)
document = MediaNode.objects.get(pk=279)
activity.image1 = document
document = MediaNode.objects.get(pk=280)
activity.image2 = document
document = MediaNode.objects.get(pk=281)
activity.image3 = document
document = MediaNode.objects.get(pk=282)
activity.image4 = document
activity.save()

activity = FieldReportProjectActivity.objects.get(pk=6)
document = MediaNode.objects.get(pk=283)
activity.image1 = document
document = MediaNode.objects.get(pk=284)
activity.image2 = document
document = MediaNode.objects.get(pk=285)
activity.image3 = document
document = MediaNode.objects.get(pk=286)
activity.image4 = document
activity.save()

activity = FieldReportProjectActivity.objects.get(pk=7)
document = MediaNode.objects.get(pk=293)
activity.image1 = document
document = MediaNode.objects.get(pk=294)
activity.image2 = document
document = MediaNode.objects.get(pk=295)
activity.image3 = document
document = MediaNode.objects.get(pk=296)
activity.image4 = document
activity.save()
