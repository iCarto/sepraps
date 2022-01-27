from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    # The following SPA settings are handled in Django-SPA
    # - everything not matched in Django's urlpatterns goes to /
    # - index.html served on /
    # - all /static/... files served on /...
    # Django REST Framework urls
    # other views still work too
    path("api/documents/", include("documents.urls")),
    path("api/users/", include("users.urls")),
    path("api/monitoring/", include("monitoring.urls")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("gestion/", admin.site.urls),
]

if settings.DEPLOYMENT == "dev":
    urlpatterns = urlpatterns + static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )

if settings.DEBUG:
    import debug_toolbar  # noqa: WPS433

    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
