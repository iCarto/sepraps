from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.building_component import BuildingComponent
from app.serializers.building_component_serializer import BuildingComponentSerializer


class BuildingComponentViewSet(ModelListAuditViewSet):
    queryset = BuildingComponent.objects.all()
    serializer_class = BuildingComponentSerializer
    http_method_names = ["put"]
