# from cmath import log
from itertools import chain

from django.db.models import Q
from django.http import HttpResponse
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from app.models.domain_entry import DomainEntry
from app.models.milestone import PHASE_CHOICES, Milestone
from app.models.project import Project
from app.models.project_questionnaire_instance import ProjectQuestionnaireInstance
from app.serializers.contact_relationship_serializer import (
    ContactRelationshipSerializer,
)
from app.serializers.milestone_serializer import MilestoneSerializer
from app.serializers.project_questionnaire_instance_serializer import (
    ProjectQuestionnaireInstanceSerializer,
)
from app.serializers.project_serializer import (
    ProjectSerializer,
    ProjectSummarySerializer,
)
from questionnaires.models.questionnaire import Questionnaire
from users.constants import GROUP_EDICION, GROUP_GESTION


class ProjectFilter(filters.FilterSet):
    status = filters.CharFilter(method="filter_by_status")
    search = filters.CharFilter(method="filter_by_search_text")
    last_modified_items = filters.CharFilter(method="filter_by_last_modified_items")

    def filter_by_status(self, queryset, name, status):
        if status == "active":
            return queryset.filter(closed=False)
        return queryset

    def filter_by_search_text(self, queryset, name, search_text):
        return queryset.filter(
            Q(linked_localities__name__icontains=search_text)
            | Q(code__icontains=search_text)
        ).distinct()

    def filter_by_last_modified_items(self, queryset, name, last_modified_items):
        limit = int(last_modified_items)
        return queryset.filter(closed=False).order_by("-updated_at")[:limit]

    class Meta(object):
        model = Project
        fields = ("search",)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.select_related(
        "main_infrastructure",
        "main_infrastructure__locality",
        "main_infrastructure__locality__department",
        "main_infrastructure__locality__district",
        "provider",
        "provider__locality",
        "provider__locality__department",
        "provider__locality__district",
        "construction_contract",
    )
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        queryset = Project.objects.order_by("-updated_at")
        if self.action == "milestones":
            return queryset
        if self.request.user.belongs_to([GROUP_GESTION, GROUP_EDICION]):
            queryset = queryset.filter(
                Q(
                    construction_contract__constructioncontractcontact__contact__user=self.request.user
                )
                | Q(creation_user=self.request.user)
            ).distinct()
        return self.get_serializer_class().setup_eager_loading(queryset)

    def get_serializer_class(self):
        if self.action == "list":
            return ProjectSummarySerializer
        return super().get_serializer_class()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"domain": DomainEntry.objects.all()})
        return context

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
    def close_project(self, request, pk=None):
        project = self.get_object()

        project.closed = True

        project.save()

        return HttpResponse(status=200)

    @action(detail=True)
    def contacts(self, request, pk=None):
        """
        Returns a list of all the contacts for the project
        """
        # TODO optimize query
        project = self.get_object()

        provider_contacts = []
        if project.provider:
            provider_contacts = project.provider.providercontact_set.all()

        contract_contacts = []
        contractor_contacts = []
        if project.construction_contract:
            contract_contacts = (
                project.construction_contract.constructioncontractcontact_set.all()
            )

            if project.construction_contract.contractor:
                contractor_contacts = (
                    project.construction_contract.contractor.contractorcontact_set.all()
                )

        return Response(
            ContactRelationshipSerializer(
                sorted(
                    chain(provider_contacts, contract_contacts, contractor_contacts),
                    key=lambda entitycontact: entitycontact.contact.name,
                ),
                many=True,
                context={"request": request},
            ).data
        )

    @action(detail=True)
    def milestones(self, request, pk=None):
        """
        Returns a list of all the milestones for the project
        """
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
        url_path="questionnaire_instances/(?P<questionnaire_code>\w+)",
    )
    def questionnaire_instances(self, request, questionnaire_code, pk=None):
        """
        Returns a list of all the instances of the questionnaire for the project
        """
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
                instance=dict(
                    project=project,
                    questionnaire=questionnaire,
                    questionnaire_instances=questionnaire_instances,
                ),
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
                dict(
                    project=project,
                    questionnaire=questionnaire,
                    questionnaire_instances=questionnaire_instances,
                ),
                context={"request": request},
            ).data
        )
