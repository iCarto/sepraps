from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from monitoring.models.construction_contract import ConstructionContract
from monitoring.models.domain_entry import DomainEntry
from monitoring.serializers.construction_contract_serializer import (
    ConstructionContractSerializer,
    ConstructionContractShortSerializer,
    ConstructionContractSummarySerializer,
)
from rest_framework import viewsets


class ConstructionContractFilter(filters.FilterSet):
    status = filters.CharFilter(method="filter_by_status")
    search = filters.CharFilter(method="filter_by_search_text")
    last_modified_items = filters.CharFilter(method="filter_by_last_modified_items")

    def filter_by_status(self, queryset, name, status):
        if status == "active":
            return queryset.filter(closed=False)

        return queryset

    def filter_by_search_text(self, queryset, name, search_text):

        return queryset.filter(Q(number__icontains=search_text))

    def filter_by_last_modified_items(self, queryset, name, last_modified_items):
        limit = int(last_modified_items)
        return queryset.filter(closed=False).order_by("-updated_at")[:limit]

    class Meta:
        model = ConstructionContract
        fields = ("search",)


class ConstructionContractViewSet(viewsets.ModelViewSet):
    serializer_class = ConstructionContractSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ConstructionContractFilter

    def get_queryset(self):
        queryset = ConstructionContract.objects.filter(closed=False).order_by(
            "-created_at"
        )
        return self.get_serializer_class().setup_eager_loading(queryset)

    def get_serializer_context(self):
        context = super(ConstructionContractViewSet, self).get_serializer_context()
        context.update({"action": self.action})
        context.update({"domain": DomainEntry.objects.all()})
        return context

    def get_serializer_class(self):
        if self.action == "list":
            template = self.request.query_params.get("template")
            if template == "short":
                return ConstructionContractShortSerializer
            return ConstructionContractSummarySerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.validated_data["creation_user"] = self.request.user
        return super().perform_create(serializer)
