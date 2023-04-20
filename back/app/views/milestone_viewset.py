from rest_framework import mixins, viewsets

from app.models.milestone import Milestone
from app.serializers.milestone_serializer import MilestoneSerializer


class MilestoneViewSet(
    mixins.UpdateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    queryset = Milestone.objects.all().order_by("ordering")
    serializer_class = MilestoneSerializer
