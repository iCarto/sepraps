from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from app.models.contact_relationship import ContractorContact
from app.models.contractor import Contractor
from app.serializers.contact_relationship_serializer import ContractorContactSerializer
from app.serializers.contractor_serializer import ContractorSerializer
from domains.models import DomainEntry


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
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ContractorFilter
    serializer_class = ContractorSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"domain": DomainEntry.objects.all()})
        return context

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
            serializer = ContractorContactSerializer(data=request_data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            contact = serializer.save(created_by=request.user, updated_by=request.user)
            return Response(
                ContractorContactSerializer(contact).data,
                status=status.HTTP_201_CREATED,
            )
        if request.method == "GET":
            queryset = ContractorContact.objects.filter(entity=pk).order_by("id")
            return Response(ContractorContactSerializer(queryset, many=True).data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
