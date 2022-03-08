from itertools import chain

from django.db import connection
from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from monitoring.models.milestone import CATEGORY_CHOICES, Milestone
from monitoring.models.project import Project
from monitoring.serializers.contact_serializer import ContactSerializer
from monitoring.serializers.milestone_serializer import MilestoneSerializer
from monitoring.serializers.project_serializer import (
    ProjectSerializer,
    ProjectShortSerializer,
    ProjectSummarySerializer,
)
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class ProjectFilter(filters.FilterSet):
    status = filters.CharFilter(method="filter_by_status")
    search = filters.CharFilter(method="filter_by_search_text")

    def filter_by_status(self, queryset, name, status):
        if status == "active":
            return queryset.filter(closed=False)

        return queryset

    def filter_by_search_text(self, queryset, name, search_text):

        return queryset.filter(
            Q(name__icontains=search_text) | Q(code__icontains=search_text)
        )

    class Meta:
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
        "financing_fund",
        "financing_program",
    )
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        # Query optimizations for different actions
        if self.action == "milestones":
            return Project.objects.all()
        if self.action == "list":
            template = self.request.query_params.get("template")
            if template == "short":
                return Project.objects.all()
            return Project.objects.select_related(
                "main_infrastructure",
                "main_infrastructure__locality",
                "main_infrastructure__locality__department",
                "main_infrastructure__locality__district",
                "provider",
                "financing_fund",
                "financing_program",
            ).prefetch_related("milestones")
        return Project.objects.select_related(
            "main_infrastructure",
            "main_infrastructure__locality",
            "main_infrastructure__locality__department",
            "main_infrastructure__locality__district",
            "provider",
            "provider__locality",
            "provider__locality__department",
            "provider__locality__district",
            "construction_contract",
            "financing_fund",
            "financing_program",
        ).prefetch_related("linked_localities", "provider__contacts", "milestones")

    def get_serializer_class(self):
        if self.action == "list":
            template = self.request.query_params.get("template")
            if template == "short":
                return ProjectShortSerializer
            return ProjectSummarySerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.validated_data["creation_user"] = self.request.user
        return super().perform_create(serializer)

    @action(detail=True)
    def contacts(self, request, pk=None):
        """
        Returns a list of all the contacts for the project
        """
        # TODO optimize query
        project = self.get_object()

        provider_contacts = []
        if project.provider:
            provider_contacts = project.provider.contacts.all()

        contractor_contacts = []
        if project.construction_contract and project.construction_contract.contractor:
            contractor_contacts = (
                project.construction_contract.contractor.contacts.all()
            )

        return Response(
            ContactSerializer(
                sorted(
                    chain(provider_contacts, contractor_contacts),
                    key=lambda contact: contact.name,
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

    @action(detail=False)
    def projects_with_current_milestone(self, request):

        with connection.cursor() as cursor:
            cursor.execute(
                """
            WITH vals (project_id, project_name, project_latitude, project_longitude, category) AS (
                select p.id, p.name, mi.latitude, mi.longitude, m.category from project p
                    left join milestone m on m.project_id = p.id and m.compliance_date is not null
                    left join infrastructure mi on mi.id = p.main_infrastructure_id
                where m.parent_id is null
                order by p.name, m.ordering desc
            )
            SELECT
                project_id,
                project_name,
                project_latitude,
                project_longitude,
                COALESCE((ARRAY_AGG(category) FILTER (WHERE category IS NOT NULL))[1], 'no_started') as milestone
            FROM vals
            GROUP BY
                project_id,
                project_name,
                project_latitude,
                project_longitude
            """
            )
            projects = dictfetchall(cursor)
            for project in projects:
                project["milestone_name"] = dict(CATEGORY_CHOICES).get(
                    project["milestone"], project["milestone"]
                )
            return Response(projects)


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]
