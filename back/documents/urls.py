from django.urls import include, path

from documents.views import MediaView, download, preview


urlpatterns = [
    path("preview/<path:media_path>", preview, name="preview-view"),
    path("download/<path:media_path>", download, name="download-view"),
    path("<path:media_path>", MediaView.as_view(), name="media-view"),
]
