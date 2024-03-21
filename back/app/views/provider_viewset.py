from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from app.base.views.base_viewsets import ModelListAuditViewSet
from app.base.views.filters import MappedOrderingFilter
from app.models.contact_relationship import ProviderContact
from app.models.provider import Provider
from app.serializers.contact_relationship_serializer import ProviderContactSerializer
from app.serializers.provider_serializer import (
    ProviderSerializer,
    ProviderSummarySerializer,
)


class ProviderOrderingFilter(MappedOrderingFilter):
    ordering_field_mappping = {
        "area_label": "area",
        "type_label": "type",
        "is_legalized_label": "is_legalized",
    }


class ProviderFilter(filters.FilterSet):
    class Meta(object):
        model = Provider
        fields = ("search",)

    search = filters.CharFilter(method="filter_by_search_text")
    last_modified_items = filters.CharFilter(method="filter_by_last_modified_items")

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(name__icontains=search_text)

    def filter_by_last_modified_items(self, queryset, name, last_modified_items):  # noqa: ARG002
        limit = int(last_modified_items)
        return queryset.filter(active=True).order_by("-updated_at")[:limit]


class ProviderViewSet(ModelListAuditViewSet):
    queryset = Provider.objects.all().order_by("name")
    serializer_class = ProviderSerializer
    summary_serializer_class = ProviderSummarySerializer
    filterset_class = ProviderFilter
    filter_backends = (DjangoFilterBackend, ProviderOrderingFilter)
    ordering_fields = ("name", "area_label", "type_label", "is_legalized_label")

    @action(
        methods=["GET", "POST"],
        detail=True,
        url_path="contacts",
        url_name="contractor_contacts",
    )
    def get_contractor_contacts(self, request, pk):
        if request.method == "POST":
            request_data = request.data
            request_data["entity"] = pk
            serializer = ProviderContactSerializer(data=request_data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            contact = serializer.save(created_by=request.user, updated_by=request.user)
            return Response(
                ProviderContactSerializer(contact).data, status=status.HTTP_201_CREATED
            )
        if request.method == "GET":
            queryset = ProviderContact.objects.filter(entity=pk).order_by("id")
            return Response(ProviderContactSerializer(queryset, many=True).data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
