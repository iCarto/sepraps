from monitoring.util import is_geojson_request
from monitoring.views.mixin import ListPaginationMixin, ListSummaryMixin
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination


class ModelListViewSet(  # noqa:WPS215
    ListPaginationMixin, ListSummaryMixin, viewsets.ModelViewSet
):
    """Viewset class with list and geo serializers."""

    def get_serializer_class(self):
        if self.action == "list":
            # https://www.iana.org/assignments/media-types/application/geo+json
            if self.request.content_type == "application/geo+json":
                return self.get_geo_serializer_class()
            return self.get_summary_serializer_class()
        return super().get_serializer_class()

    def get_pagination_class(self):
        if is_geojson_request(self):
            return None
        return PageNumberPagination()

    def paginate_queryset(self, queryset):
        if "page" not in self.request.query_params:
            return None
        return super().paginate_queryset(queryset)
