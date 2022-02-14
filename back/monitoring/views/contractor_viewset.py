from monitoring.models.contractor import Contractor
from monitoring.serializers.contractor_serializer import ContractorSerializer
from rest_framework import viewsets


class ContractorViewSet(viewsets.ModelViewSet):
    queryset = Contractor.objects.all()
    serializer_class = ContractorSerializer
