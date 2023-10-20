from django.db import connection
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.settings import api_settings

from app.base.views.mixin import AuditViewMixin, ListGeoMixin, ListSummaryMixin
from app.base.views.renderers import DataFrameShapefileFileRenderer, GeojsonRenderer
from app.util import dictfetchall
from questionnaires.renderers import DataFrameCSVFileRenderer


class ModelListViewSet(ListSummaryMixin, ListGeoMixin, viewsets.ModelViewSet):
    """Viewset class with list and geo serializers."""

    renderer_classes = tuple(api_settings.DEFAULT_RENDERER_CLASSES) + (
        GeojsonRenderer,
        DataFrameCSVFileRenderer,
        DataFrameShapefileFileRenderer,
    )
    pagination_class = PageNumberPagination

    def get_serializer_class(self):
        if self.action == "list":
            if (  # noqa: WPS337
                self.request.accepted_renderer
                and self.request.accepted_renderer.format == "geojson"
            ):
                return self.get_geo_serializer_class()
            return self.get_summary_serializer_class()
        return super().get_serializer_class()

    def paginate_queryset(self, queryset):
        if "page" not in self.request.query_params:
            return None
        return super().paginate_queryset(queryset)


class ModelListAuditViewSet(AuditViewMixin, ModelListViewSet):
    """Viewset class with list and geo serializers and audit filling in perform_create and perform_update method."""


class ModelStatsViewSetMixin(object):
    """Viewset class that includes stats data in context."""

    def get_stats_database_view(self):
        try:
            return self.stats_database_view
        except AttributeError:
            return ""

    def get_stats_database_lookup_field(self):
        try:
            return self.stats_database_lookup_field
        except AttributeError:
            return "id"

    def use_stats(self):
        is_search = self.request.GET.get("search") is not None
        return not is_search

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.action in {"list", "retrieve"}:
            # if searching stats data is not needed

            if self.use_stats():
                query = "select * from {0}".format(
                    self.get_stats_database_view()
                )  # noqa; S608
                if self.action == "retrieve":
                    pk = self.kwargs.get("pk")
                    query += " where {lookup_field} = {pk}".format(
                        lookup_field=self.get_stats_database_lookup_field(), pk=pk
                    )

                with connection.cursor() as cursor:
                    cursor.execute(query)
                    context.update({"stats": dictfetchall(cursor)})
        return context
