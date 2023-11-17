from app.base.views.base_viewsets import ModelListAuditViewSet
from app.models.building_component_monitoring import BuildingComponentMonitoring
from app.serializers.building_component_monitoring_serializer import (
    BuildingCompanyMonitoringSerializer,
)


class BuildingComponentMonitoringViewSet(ModelListAuditViewSet):
    queryset = BuildingComponentMonitoring.objects.all()
    serializer_class = BuildingCompanyMonitoringSerializer
    http_method_names = ["get", "put", "delete"]
