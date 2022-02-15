from monitoring.models.milestone import Milestone
from monitoring.serializers.milestone_serializer import MilestoneSerializer
from rest_framework import mixins, viewsets


class MilestoneViewSet(
    mixins.UpdateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    queryset = Milestone.objects.all().order_by("ordering")
    serializer_class = MilestoneSerializer
