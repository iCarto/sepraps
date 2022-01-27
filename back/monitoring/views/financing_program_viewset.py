from monitoring.models.financing_program import FinancingProgram
from monitoring.serializers.financing_program_serializer import (
    FinancingProgramSerializer,
)
from rest_framework import permissions, viewsets


class FinancingProgramViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FinancingProgram.objects.all()
    serializer_class = FinancingProgramSerializer
    permission_classes = [permissions.DjangoModelPermissions]
