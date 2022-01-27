from django.urls import include, path
from documents.views import MediaView


urlpatterns = [path("<path:path>", MediaView.as_view(), name="media-view")]
