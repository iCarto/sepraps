import json
import os

from django.conf import settings
from django.contrib.gis.db.models import PointField
from django.db import models
from django.db.models import Q
from django.db.models.functions import Coalesce
from django.http import HttpResponse
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response

from app.base.views.base_viewsets import ModelListViewSet
from app.models.building_component import BuildingComponent
from app.models.building_component_monitoring import BuildingComponentMonitoring
from app.models.certification import Certification
from app.models.connection import Connection
from app.models.milestone import Milestone
from app.models.project import Project
from app.models.project_questionnaire_instance import ProjectQuestionnaireInstance
from app.models.social_component_monitoring import SocialComponentMonitoring
from app.serializers.building_component_monitoring_serializer import (
    BuildingComponentMonitoringSerializer,
    BuildingComponentMonitoringSummarySerializer,
)
from app.serializers.building_component_serializer import BuildingComponentSerializer
from app.serializers.certification_serializer import (
    CertificationSerializer,
    CertificationSummarySerializer,
)
from app.serializers.connection_serializer import ConnectionSerializer
from app.serializers.milestone_serializer import MilestoneSerializer
from app.serializers.project_questionnaire_instance_serializer import (
    ProjectQuestionnaireInstanceSerializer,
)
from app.serializers.project_serializer import (
    ProjectGeoSerializer,
    ProjectSerializer,
    ProjectShortSerializer,
    ProjectSummarySerializer,
)
from app.serializers.social_component_monitoring_serializer import (
    SocialComponentMonitoringSerializer,
    SocialComponentMonitoringSummarySerializer,
)
from app.util import is_geojson_request
from questionnaires.models.questionnaire import Questionnaire


class ProjectFilter(filters.FilterSet):
    class Meta(object):
        model = Project
        fields = ("search", "main_infrastructure", "construction_contract")

    status = filters.CharFilter(method="filter_by_status")
    search = filters.CharFilter(method="filter_by_search_text")
    locality = filters.CharFilter(method="filter_by_locality")
    district = filters.CharFilter(method="filter_by_district")
    department = filters.CharFilter(method="filter_by_department")
    construction_contract = filters.CharFilter(method="filter_by_construction_contract")
    financing_program = filters.CharFilter(method="filter_by_financing_program")
    last_modified_items = filters.CharFilter(method="filter_by_last_modified_items")

    def filter_by_status(self, queryset, name, status):  # noqa: ARG002
        if status == "active":
            return queryset.filter(closed=False)
        return queryset

    def filter_by_search_text(self, queryset, name, search_text):  # noqa: ARG002
        return queryset.filter(
            Q(linked_localities__name__icontains=search_text)
            | Q(linked_localities__district__name__icontains=search_text)
            | Q(linked_localities__district__department__name__icontains=search_text)
            | Q(code__icontains=search_text)
        ).distinct()

    def filter_by_locality(self, queryset, param_name, search_value):  # noqa: ARG002
        return queryset.filter(models.Q(main_infrastructure__locality=search_value))

    def filter_by_district(self, queryset, param_name, district):  # noqa: ARG002
        return queryset.filter(models.Q(linked_localities__district=district))

    def filter_by_department(self, queryset, param_name, department):  # noqa: ARG002
        return queryset.filter(models.Q(linked_localities__department=department))

    def filter_by_construction_contract(self, queryset, param_name, search_value):  # noqa: ARG002
        return queryset.filter(
            models.Q(related_contracts__contract=search_value)
        ).distinct()

    def filter_by_financing_program(self, queryset, param_name, search_value):  # noqa: ARG002
        return queryset.filter(
            models.Q(related_contracts__contract__financing_program=search_value)
        ).distinct()

    def filter_by_last_modified_items(self, queryset, name, last_modified_items):  # noqa: ARG002
        limit = int(last_modified_items)
        return queryset.filter(closed=False).order_by("-updated_at")[:limit]


class ProjectViewSet(ModelListViewSet):
    queryset = Project.objects.select_related(
        "main_infrastructure",
        "main_infrastructure__locality",
        "main_infrastructure__locality__department",
        "main_infrastructure__locality__district",
        "provider",
    ).prefetch_related("related_contracts__contract")
    serializer_class = ProjectSerializer
    permission_classes = [permissions.DjangoModelPermissions]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter

    def get_queryset(self):
        queryset = Project.objects.order_by("-updated_at")
        if self.action == "milestones":
            return queryset
        # Removing this condition until user roles are done
        # if self.request.user.belongs_to([GROUP_GESTION, GROUP_EDICION]):
        #     queryset = queryset.filter(
        #         Q(
        #             construction_contract__constructioncontractcontact__contact__user=self.request.user
        #         )
        #         | Q(creation_user=self.request.user)
        #     ).distinct()

        if is_geojson_request(self.request):
            queryset = queryset.annotate(
                location=models.Func(
                    models.F("main_infrastructure__longitude"),
                    models.F("main_infrastructure__latitude"),
                    function="ST_MakePoint",
                    template="%(function)s(%(expressions)s)",
                    output_field=PointField(),
                )
            )

        return self.get_serializer_class().setup_eager_loading(queryset)

    def get_serializer_class(self):
        if is_geojson_request(self.request):
            return ProjectGeoSerializer
        if self.action == "list":
            template = self.request.query_params.get("template")
            if template == "short":
                return ProjectShortSerializer
            return ProjectSummarySerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.validated_data["creation_user"] = self.request.user
        return super().perform_create(serializer)

    def patch(self, request, pk):
        project = self.get_object(pk)
        serializer = self.get_serializer_class()(
            project, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.validated_data)

    @action(detail=True, methods=["put"], url_path="close")
    def close_project(self, request, pk=None):  # noqa: ARG002
        project = self.get_object()

        project.closed = True

        project.save()

        return HttpResponse(status=200)

    @action(detail=True)
    def contacts(self, request, pk=None):  # noqa: ARG002
        """Returns a list of all the contacts for the project."""
        # TODO(egago): optimize query
        project = self.get_object()

        provider_contacts = []
        if project.provider:
            provider_contacts = project.provider.providercontact_set.all()

        contract_contacts = []
        contractor_contacts = []
        # TODO(egago): Find contacts from associated project contracts
        # if project.construction_contract:
        #    contract_contacts = (
        #        project.construction_contract.constructioncontractcontact_set.all()
        #    )

        #    if project.construction_contract.contractor:
        #        contractor_contacts = (
        #            project.construction_contract.contractor.contractorcontact_set.all()
        #        )

        return Response(
            ContactRelationshipSerializer(
                sorted(
                    chain(provider_contacts, contract_contacts, contractor_contacts),
                    key=lambda entitycontact: entitycontact.contact.name,
                ),
                many=True,
                context={"request": request, "domain": DomainEntry.objects.all()},
            ).data
        )

    @action(detail=True)
    def milestones(self, request, pk=None):  # noqa: ARG002
        """Returns a list of all the milestones for the project."""
        project = self.get_object()
        milestones = (
            Milestone.objects.filter(project=project)
            .exclude(parent__isnull=False)
            .order_by("ordering")
            .prefetch_related("children")
        )

        return Response(
            MilestoneSerializer(
                milestones, many=True, context={"request": request}
            ).data
        )

    @action(
        detail=True,
        methods=["get", "put"],
        url_path="questionnaire_instances/(?P<questionnaire_code>\w+)",  # noqa: W605
    )
    def questionnaire_instances(self, request, questionnaire_code, pk=None):  # noqa: ARG002
        """Returns a list of all the instances of the questionnaire for the project."""
        project = self.get_object()
        questionnaire = Questionnaire.objects.get(pk=questionnaire_code)
        instances = ProjectQuestionnaireInstance.objects.filter(
            project=project.id, questionnaire__code=questionnaire_code
        ).prefetch_related("questionnaire_instance__values")
        questionnaire_instances = [
            instance.questionnaire_instance for instance in instances
        ]

        if request.method == "PUT":
            serializer = ProjectQuestionnaireInstanceSerializer(
                data=request.data, context={"request": request}
            )
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            serializer.update(
                instance={
                    "project": project,
                    "questionnaire": questionnaire,
                    "questionnaire_instances": questionnaire_instances,
                },
                validated_data=serializer.validated_data,
            )

        instances = ProjectQuestionnaireInstance.objects.filter(
            project=project.id, questionnaire__code=questionnaire_code
        ).prefetch_related("questionnaire_instance__values")
        questionnaire_instances = [
            instance.questionnaire_instance for instance in instances
        ]

        return Response(
            ProjectQuestionnaireInstanceSerializer(
                {
                    "project": project,
                    "questionnaire": questionnaire,
                    "questionnaire_instances": questionnaire_instances,
                },
                context={"request": request},
            ).data
        )

    @action(
        methods=["GET", "POST"],
        detail=True,
        url_path="buildingcomponentmonitorings",
        url_name="building_component_monitorings",
    )
    def manage_project_building_component_monitorings(self, request, pk):
        if request.method == "POST":
            project = self.get_object()
            if project:
                building_component_data = request.data.get("building_component", None)
                building_component = None

                if building_component_data:
                    building_component = BuildingComponent.objects.get(
                        id=building_component_data["id"]
                    )
                else:
                    serializer = BuildingComponentSerializer(data=request.data)
                    if serializer.is_valid():
                        bc_config = get_building_components_config(project)
                        building_component = serializer.save(
                            technical_properties=bc_config.get(
                                serializer.validated_data.get("code"), {}
                            ).get("technical_properties", {}),
                            validation_properties=bc_config.get(
                                serializer.validated_data.get("code"), {}
                            ).get("validation_properties", {}),
                            created_by=request.user,
                            updated_by=request.user,
                        )

                monitoring = BuildingComponentMonitoring(
                    building_component=building_component,
                    project=project,
                    created_by=request.user,
                    updated_by=request.user,
                )
                monitoring.save()

                return Response(BuildingComponentMonitoringSerializer(monitoring).data)

        if request.method == "GET":
            bc_monitorings = BuildingComponentMonitoring.objects.filter(
                project=pk
            ).order_by("id")
            serializer = BuildingComponentMonitoringSummarySerializer(
                bc_monitorings, many=True
            )
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=["GET", "POST"],
        detail=True,
        url_path="socialcomponentmonitorings",
        url_name="social_component_monitorings",
    )
    def manage_project_social_component_monitorings(self, request, pk):
        if request.method == "POST":
            project = self.get_object()
            if project:
                serializer = SocialComponentMonitoringSerializer(data=request.data)
                if serializer.is_valid():
                    social_component = serializer.save(
                        project=project,
                        created_by=request.user,
                        updated_by=request.user,
                    )

                    return Response(
                        SocialComponentMonitoringSerializer(social_component).data
                    )

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        if request.method == "GET":
            sc_monitorings = SocialComponentMonitoring.objects.filter(
                project=pk
            ).order_by("id")

            return Response(
                SocialComponentMonitoringSummarySerializer(
                    sc_monitorings, many=True
                ).data
            )
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(
        methods=["GET"],
        detail=True,
        url_path="buildingcomponenttypes",
        url_name="building_component_types",
    )
    def get_building_component_types(self, request, pk):  # noqa: ARG002
        project = self.get_object()
        result = []
        for component_code, component_config in get_building_components_config(
            project
        ).items():
            result.append(
                {"value": component_code, "label": component_config.get("name")}
            )
        return Response(result)

    @action(
        methods=["GET"],
        detail=True,
        url_path="socialcomponenttypes",
        url_name="social_component_types",
    )
    def get_social_component_types(self, request, pk):  # noqa: ARG002
        project = self.get_object()
        result = []
        for component_code, component_config in get_social_components_config(
            project
        ).items():
            result.append(
                {"value": component_code, "label": component_config.get("name")}
            )
        return Response(result)

    @action(
        methods=["GET"], detail=True, url_path="connections", url_name="connections"
    )
    def get_connections(self, request, pk):  # noqa: ARG002
        project = self.get_object()
        connection = Connection.objects.filter(project=project)

        serializer = ConnectionSerializer(connection, many=True)

        return Response(serializer.data)

    @action(
        methods=["GET", "POST"],
        detail=True,
        url_path="certifications",
        url_name="certifications",
    )
    def manage_project_certifications(self, request, pk):
        if request.method == "POST":
            project = self.get_object()
            if project:
                serializer = CertificationSerializer(data=request.data)
                if serializer.is_valid():
                    certification = serializer.save(
                        project=project,
                        created_by=request.user,
                        updated_by=request.user,
                    )

                    return Response(CertificationSerializer(certification).data)

                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if request.method == "GET":
            certifications = (
                Certification.objects.filter(project=pk)
                .annotate(
                    approval_date=Coalesce(
                        "payment__approval_date", "payment__expected_approval_date"
                    )
                )
                .order_by("approval_date")
            )
            serializer = CertificationSummarySerializer(
                certifications, many=True, context={"request": request}
            )
            return Response(serializer.data)

        return Response(status=status.HTTP_400_BAD_REQUEST)


def get_building_components_config(project):
    if not project.project_type:
        return {}
    # Change when project type is multiple
    data = {}
    data_path = os.path.join(
        settings.BASE_DIR, "app", "data", "project", f"{project.project_type}.json"
    )
    with open(data_path) as f:
        data = json.load(f)
        return data.get("building_components", {})


def get_social_components_config(project):
    if not project.project_type:
        return {}
    # Change when project type is multiple
    data = {}
    data_path = os.path.join(
        settings.BASE_DIR, "app", "data", "project", f"{project.project_type}.json"
    )
    with open(data_path) as f:
        data = json.load(f)
        return data.get("social_components", {})
