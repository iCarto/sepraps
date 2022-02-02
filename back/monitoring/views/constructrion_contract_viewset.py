from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from monitoring.models.construction_contract import ConstructionContract
from monitoring.serializers.construction_contract_serializer import (
    ConstructionContractSerializer,
    ConstructionContractShortSerializer,
    ConstructionContractSummarySerializer,
)
from rest_framework import viewsets


class ConstructionContractFilter(filters.FilterSet):
    status = filters.CharFilter(method="filter_by_status")

    def filter_by_status(self, queryset, name, status):
        if status == "active":
            return queryset.filter(closed=False)

        return queryset

    class Meta:
        model = ConstructionContract
        fields = ("status",)


class ConstructionContractViewSet(viewsets.ModelViewSet):
    queryset = ConstructionContract.objects.all()
    serializer_class = ConstructionContractSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ConstructionContractFilter

    def get_serializer_context(self):
        context = super(ConstructionContractViewSet, self).get_serializer_context()
        context["action"] = self.action
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
