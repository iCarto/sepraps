from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.social_component_training import SocialComponentTraining
from app.serializers.social_component_training_serializer import (
    SocialComponentTrainingSerializer,
)


class SocialComponentTrainingViewSet(ModelListAuditViewSet):
    queryset = SocialComponentTraining.objects.all()
    serializer_class = SocialComponentTrainingSerializer
