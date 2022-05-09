from itertools import chain

from django.db import connection
from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from monitoring.models.domain_entry import DomainEntry
from monitoring.models.milestone import CATEGORY_CHOICES, PHASE_CHOICES, Milestone
from monitoring.models.project import Project
from monitoring.serializers.contact_serializer import ContactSerializer
from monitoring.serializers.milestone_serializer import MilestoneSerializer
from monitoring.serializers.project_serializer import (
    ProjectSerializer,
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
            Q(linked_localities__name__icontains=search_text)
            | Q(code__icontains=search_text)
        ).distinct()

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
    )
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter
    permission_classes = [permissions.DjangoModelPermissions]

    def get_queryset(self):
        queryset = Project.objects.all().order_by("-code")
        if self.action == "milestones":
            return queryset
        return self.get_serializer_class().setup_eager_loading(queryset)

    def get_serializer_class(self):
        print(self.action)
        if self.action == "list":
            return ProjectSummarySerializer
        return super().get_serializer_class()

    def get_serializer_context(self):
        context = super(ProjectViewSet, self).get_serializer_context()
        context.update({"domain": DomainEntry.objects.all()})
        return context

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

        contract_contacts = []
        contractor_contacts = []
        if project.construction_contract:
            if project.construction_contract.field_manager:
                contract_contacts.append(project.construction_contract.field_manager)
            if project.construction_contract.construction_inspector:
                contract_contacts.append(
                    project.construction_contract.construction_inspector
                )
            if project.construction_contract.construction_supervisor:
                contract_contacts.append(
                    project.construction_contract.construction_supervisor
                )
            if project.construction_contract.social_coordinator:
                contract_contacts.append(
                    project.construction_contract.social_coordinator
                )
            if project.construction_contract.social_inspector:
                contract_contacts.append(project.construction_contract.social_inspector)
            if project.construction_contract.social_supervisor:
                contract_contacts.append(
                    project.construction_contract.social_supervisor
                )

            if project.construction_contract.contractor:
                contractor_contacts = (
                    project.construction_contract.contractor.contacts.all()
                )

        return Response(
            ContactSerializer(
                sorted(
                    chain(provider_contacts, contract_contacts, contractor_contacts),
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

    @action(detail=False)
    def stats_by_phase(self, request):

        with connection.cursor() as cursor:
            query = """
            with project_phase as (
                select distinct on (p.id)
                    p.id as project_id, category, phase
                from project p
                    inner join milestone m on p.id = m.project_id
                    left join infrastructure i on i.id = p.main_infrastructure_id
                    left join locality l on l.code = i.locality_id
                where m.compliance_date is null
                {project_filter_conditions}
                order by p.id, m.id asc
            ),
            phases as (
                select distinct phase
                from milestone
            )
            select ph.phase, count(prph.project_id) as total
            from phases ph
                left join project_phase prph on prph.phase = ph.phase
            group by ph.phase
            """

            project_filter_conditions = []
            if request.GET.get("construction_contract"):
                project_filter_conditions.append(
                    "and p.construction_contract_id = {}".format(
                        request.GET.get("construction_contract")
                    )
                )
            if request.GET.get("district"):
                project_filter_conditions.append(
                    "and l.district_id = '{}'".format(request.GET.get("district"))
                )
            if request.GET.get("department"):
                project_filter_conditions.append(
                    "and l.department_id = '{}'".format(request.GET.get("department"))
                )
            if request.GET.get("financing_program"):
                project_filter_conditions.append(
                    "and p.financing_program_id = {}".format(
                        request.GET.get("financing_program")
                    )
                )
            if request.GET.get("financing_fund"):
                project_filter_conditions.append(
                    " and p.financing_fund_id = {}".format(
                        request.GET.get("financing_fund")
                    )
                )

            cursor.execute(
                query.format(
                    project_filter_conditions=" ".join(project_filter_conditions)
                )
            )
            phases = dictfetchall(cursor)
            for phase in phases:
                phase["phase_name"] = dict(PHASE_CHOICES).get(
                    phase["phase"], phase["phase"]
                )
            return Response(phases)

    @action(detail=False)
    def map_by_phase(self, request):

        with connection.cursor() as cursor:
            query = """
                select distinct on (p.id)
                        p.id as project_id,
                        i.latitude,
                        i.longitude,
                        l.name as locality,
                        di.name as district,
                        de.name as department,
                        category,
                        phase
                from project p
                    inner join milestone m on p.id = m.project_id
                    left join infrastructure i on i.id = p.main_infrastructure_id
                    left join locality l on l.code = i.locality_id
                    inner join district di on di.code = l.district_id
                    inner join department de on de.code = l.department_id
                where m.compliance_date is null
                {project_filter_conditions}
                order by p.id, m.id asc
            """

            project_filter_conditions = []
            if request.GET.get("construction_contract"):
                project_filter_conditions.append(
                    "and p.construction_contract_id = {}".format(
                        request.GET.get("construction_contract")
                    )
                )
            if request.GET.get("district"):
                project_filter_conditions.append(
                    "and l.district_id = '{}'".format(request.GET.get("district"))
                )
            if request.GET.get("department"):
                project_filter_conditions.append(
                    "and l.department_id = '{}'".format(request.GET.get("department"))
                )
            if request.GET.get("financing_program"):
                project_filter_conditions.append(
                    "and p.financing_program_id = {}".format(
                        request.GET.get("financing_program")
                    )
                )
            if request.GET.get("financing_fund"):
                project_filter_conditions.append(
                    " and p.financing_fund_id = {}".format(
                        request.GET.get("financing_fund")
                    )
                )

            cursor.execute(
                query.format(
                    project_filter_conditions=" ".join(project_filter_conditions)
                )
            )
            phases = dictfetchall(cursor)
            for phase in phases:
                phase["phase_name"] = dict(PHASE_CHOICES).get(
                    phase["phase"], phase["phase"]
                )
            return Response(phases)


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]
