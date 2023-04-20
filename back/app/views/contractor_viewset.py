from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from app.models.contractor import Contractor
from app.serializers.contractor_serializer import ContractorSerializer
from rest_framework import viewsets


class ContractorFilter(filters.FilterSet):
    search = filters.CharFilter(method="filter_by_search_text")

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(
            Q(name__icontains=search_text)
            | Q(email__icontains=search_text)
            | Q(phone__icontains=search_text)
        )

    class Meta:
        model = Contractor
        fields = ("search",)


class ContractorViewSet(viewsets.ModelViewSet):
    queryset = Contractor.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ContractorFilter
    serializer_class = ContractorSerializer
