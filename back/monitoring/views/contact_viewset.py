from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from monitoring.models.contact import Contact
from monitoring.serializers.contact_serializer import ContactSerializer
from rest_framework import viewsets


class ContactFilter(filters.FilterSet):
    search = filters.CharFilter(method="filter_by_search_text")

    def filter_by_search_text(self, queryset, name, search_text):

        return queryset.filter(
            Q(name__icontains=search_text)
            | Q(email__icontains=search_text)
            | Q(phone__icontains=search_text)
        )

    class Meta:
        model = Contact
        fields = ("search",)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = ContactFilter
    serializer_class = ContactSerializer
