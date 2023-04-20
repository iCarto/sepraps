from rest_framework import permissions, viewsets

from app.models.financing_program import FinancingProgram
from app.serializers.financing_program_serializer import FinancingProgramSerializer


class FinancingProgramViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FinancingProgram.objects.all()
    serializer_class = FinancingProgramSerializer
    permission_classes = [permissions.DjangoModelPermissions]
