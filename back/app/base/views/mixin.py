class ListPaginationMixin(object):
    @property
    def paginator(self):
        """The paginator instance associated with the view, or `None`."""
        if not hasattr(self, "_paginator"):  # noqa: WPS421
            if self.get_pagination_class() is None:
                self._paginator = None
            else:
                self._paginator = self.get_pagination_class()
        return self._paginator

    def get_pagination_class(self):
        return self.pagination_class()


class ListGeoMixin(object):
    geo_serializer_class = None

    def get_geo_serializer_class(self):  # noqa: WPS615
        """Return the class to use for the serializer in a 'list' action.

        Defaults to using `self.geo_serializer_class`.
        """
        assert (  # noqa: S101
            self.geo_serializer_class is not None
        ), "'{0}' should either include a `geo_serializer_class` attribute, or override the `get_geo_serializer_class()` method.".format(
            self.__class__.__name__
        )

        return self.geo_serializer_class


class ListSummaryMixin(object):
    summary_serializer_class = None

    def get_summary_serializer_class(self):  # noqa: WPS615
        """Return the class to use for the serializer in a 'list' action.

        Defaults to using `self.summary_serializer_class`.
        """
        assert (  # noqa: S101
            self.summary_serializer_class is not None
        ), "'{0}' should either include a `summary_serializer_class` attribute, or override the `get_summary_serializer_class()` method.".format(
            self.__class__.__name__
        )

        return self.summary_serializer_class


class AuditViewMixin(object):
    def perform_create(self, serializer):
        serializer.validated_data["created_by"] = self.request.user
        serializer.validated_data["updated_by"] = self.request.user
        return super().perform_create(serializer)

    def perform_update(self, serializer):
        serializer.validated_data["updated_by"] = self.request.user
        return super().perform_update(serializer)
