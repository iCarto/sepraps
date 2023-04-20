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
    path("api/questionnaires/", include("questionnaires.urls")),
    path("api/monitoring/", include("app.urls")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("gestion/", admin.site.urls),
]

if "drf_spectacular" in settings.INSTALLED_APPS:
    from drf_spectacular.views import (  # noqa: WPS433
        SpectacularAPIView,
        SpectacularRedocView,
        SpectacularSwaggerView,
    )

    urlpatterns += [
        path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
        # Optional UI:
        path(
            "api/schema/swagger-ui/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),
        path(
            "api/schema/redoc/",
            SpectacularRedocView.as_view(url_name="schema"),
            name="redoc",
        ),
    ]


if settings.DEPLOYMENT == "dev":
    urlpatterns = urlpatterns + static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )

if settings.DEBUG:
    import debug_toolbar  # noqa: WPS433

    urlpatterns += [path("__debug__/", include(debug_toolbar.urls))]
