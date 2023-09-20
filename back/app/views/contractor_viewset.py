from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from domains.models import DomainEntry
from rest_framework import viewsets

from app.models.contractor import Contractor
from app.serializers.contractor_serializer import ContractorSerializer


class ContractorFilter(filters.FilterSet):
    class Meta(object):
        model = Contractor
        fields = ("search",)

    search = filters.CharFilter(method="filter_by_search_text")

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(
            Q(name__icontains=search_text)
            | Q(email__icontains=search_text)
            | Q(phone__icontains=search_text)
        )


class ContractorViewSet(viewsets.ModelViewSet):
    queryset = Contractor.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ContractorFilter
    serializer_class = ContractorSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"domain": DomainEntry.objects.all()})
        return context
