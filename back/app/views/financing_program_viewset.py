from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.settings import api_settings

from app.base.views.filters import MappedOrderingFilter
from app.base.views.renderers.dataframecsvfile import DataFrameCSVFileRenderer
from app.models.financing_program import FinancingProgram
from app.serializers.financing_program_serializer import FinancingProgramSerializer


class FinancingProgramOrderingFilter(MappedOrderingFilter):
    ordering_field_mappping = {}


class FinancingProgramFilter(filters.FilterSet):
    class Meta(object):
        model = FinancingProgram
        fields = ("search",)

    search = filters.CharFilter(method="filter_by_search_text")

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(name__icontains=search_text)


class FinancingProgramViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FinancingProgram.objects.all()
    serializer_class = FinancingProgramSerializer
    permission_classes = (permissions.DjangoModelPermissions,)
    pagination_class = PageNumberPagination
    filterset_class = FinancingProgramFilter
    filter_backends = (DjangoFilterBackend, FinancingProgramOrderingFilter)
    ordering_fields = ("name", "short_name")
    renderer_classes = (
        *tuple(api_settings.DEFAULT_RENDERER_CLASSES),
        DataFrameCSVFileRenderer,
    )

    def paginate_queryset(self, queryset):
        if "page" not in self.request.query_params:
            return None
        return super().paginate_queryset(queryset)
