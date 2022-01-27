from django.urls import include, path
from documents.views import MediaView


urlpatterns = [path("<path:media_path>", MediaView.as_view(), name="media-view")]
