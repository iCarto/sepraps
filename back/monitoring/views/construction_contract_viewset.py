from django.db import models
from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from app.models.construction_contract import ConstructionContract
from app.models.domain_entry import DomainEntry
from app.serializers.construction_contract_serializer import (
    ConstructionContractSerializer,
    ConstructionContractShortSerializer,
    ConstructionContractSummarySerializer,
)
from monitoring.views.base_viewsets import ModelListViewSet
from rest_framework.pagination import PageNumberPagination
from users.constants import GROUP_EDICION, GROUP_GESTION


class ConstructionContractFilter(filters.FilterSet):
    status = filters.CharFilter(method="filter_by_status")
    search = filters.CharFilter(method="filter_by_search_text")
    financing_program = filters.CharFilter(method="filter_by_financing_program")
    financing_fund = filters.CharFilter(method="filter_by_financing_fund")
    contractor = filters.CharFilter(method="filter_by_contractor")
    awarding_date_min = filters.CharFilter(method="filter_by_awarding_date_min")
    awarding_date_max = filters.CharFilter(method="filter_by_awarding_date_max")
    last_modified_items = filters.CharFilter(method="filter_by_last_modified_items")

    def filter_by_status(self, queryset, name, status):
        if status == "active":
            return queryset.filter(closed=False)
        return queryset

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(Q(number__icontains=search_text))

    def filter_by_financing_program(self, queryset, param_name, search_value):
        return queryset.filter(models.Q(financing_program=search_value))

    def filter_by_financing_fund(self, queryset, param_name, search_value):
        return queryset.filter(Q(financing_program__financing_funds__in=search_value))

    def filter_by_contractor(self, queryset, param_name, search_value):
        return queryset.filter(models.Q(contractor=search_value))

    def filter_by_awarding_date_min(self, queryset, param_name, date):
        return queryset.filter(awarding_date__gte=date)

    def filter_by_awarding_date_max(self, queryset, param_name, date):
        return queryset.filter(awarding_date__lte=date)

    def filter_by_last_modified_items(self, queryset, name, last_modified_items):
        limit = int(last_modified_items)
        return queryset.filter(closed=False).order_by("-updated_at")[:limit]

    class Meta(object):
        model = ConstructionContract
        fields = ("search",)


class ConstructionContractViewSet(ModelListViewSet):
    serializer_class = ConstructionContractSerializer
    pagination_class = PageNumberPagination()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ConstructionContractFilter

    def get_queryset(self):
        queryset = ConstructionContract.objects.filter(closed=False).order_by(
            "-created_at"
        )
        if self.request.user.belongs_to([GROUP_GESTION, GROUP_EDICION]):
            queryset = queryset.filter(
                Q(constructioncontractcontact__contact__user=self.request.user)
                | Q(creation_user=self.request.user)
            ).distinct()
        return self.get_serializer_class().setup_eager_loading(queryset)

    def get_serializer_context(self):
        context = super().get_serializer_context()
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
