from django.db import connection
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.models.contact import GENDER_CHOICES
from app.models.milestone import PHASE_CHOICES
from app.util import dictfetchall
from questionnaires import services as questtionnaire_services
from questionnaires.models.monthly_questionnaire_instance import (
    MonthlyQuestionnaireInstance,
)
from questionnaires.renderers import DataFrameCSVFileRenderer, DataFrameJSONRenderer
from users.constants import GROUP_EDICION, GROUP_GESTION
from users.permissions import SupervisionPermission, VisualizacionPermission


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes([DataFrameJSONRenderer, DataFrameCSVFileRenderer])
def get_monthly_questionnaire_stats(
    request, questionnaire_code, field_code, format=None
):
    query = """
            SELECT distinct mqi.*
            FROM project_questionnaire_instance pqi
                LEFT JOIN monthly_questionnaire_instance mqi ON mqi.id = pqi.questionnaire_instance_id
                LEFT JOIN project p ON p.id = pqi.project_id
                LEFT JOIN construction_contract cc on cc.id = p.construction_contract_id
                LEFT JOIN financing_program fp on fp.id = cc.financing_program_id
                LEFT JOIN financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
                LEFT JOIN project_linked_localities pll on pll.project_id = p.id
                LEFT JOIN locality l on l.code = pll.locality_id
                INNER JOIN district di on di.code = l.district_id
                INNER JOIN department de on de.code = l.department_id
            WHERE pqi.questionnaire_id = '{questionnaire_code}'
            {filter_conditions}
            ORDER BY mqi.year, mqi.month
        """

    show_expanded = False
    filter_conditions = []
    if filter := request.GET.get("project"):
        show_expanded = True
        filter_conditions.append(f"and pqi.project_id = {filter}")
    if filter := request.GET.get("construction_contract"):
        show_expanded = True
        filter_conditions.append(f"and p.construction_contract_id = {filter}")
    if filter := request.GET.get("district"):
        filter_conditions.append(f"and l.district_id = '{filter}'")
    if filter := request.GET.get("department"):
        filter_conditions.append(f"and l.department_id = '{filter}'")
    if filter := request.GET.get("financing_program"):
        filter_conditions.append(f"and cc.financing_program_id = {filter}")
    if filter := request.GET.get("financing_fund"):
        filter_conditions.append(f"and fpff.financingfund_id = {filter}")
    if filter := request.GET.get("month_from"):
        filter_conditions.append(
            "and mqi.year >= {} and mqi.month >= {}".format(
                filter.split("/")[0], filter.split("/")[1]
            )
        )
    if filter := request.GET.get("month_to"):
        filter_conditions.append(
            "and mqi.year <= {} and mqi.month <= {}".format(
                filter.split("/")[0], filter.split("/")[1]
            )
        )

    questionnaire_instances = MonthlyQuestionnaireInstance.objects.raw(
        query.format(
            questionnaire_code=questionnaire_code,
            filter_conditions=" ".join(filter_conditions),
        )
    ).prefetch_related("values")

    return Response(
        questtionnaire_services.get_monthly_questionnaire_instances_dataframe(
            questionnaire_code, field_code, questionnaire_instances, show_expanded
        )
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated, SupervisionPermission | VisualizacionPermission])
def get_provider_gender_stats(request, format=None):
    with connection.cursor() as cursor:
        query = """
            SELECT cg.gender, count(*) as total FROM (
                SELECT distinct c.id, c.gender
                FROM provider_contact pc
                    INNER JOIN contact c ON c.id = pc.contact_id
                    LEFT JOIN project p ON p.provider_id = pc.entity_id
                    LEFT JOIN construction_contract cc on cc.id = p.construction_contract_id
                    LEFT JOIN financing_program fp on fp.id = cc.financing_program_id
                    LEFT JOIN financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
                    LEFT JOIN project_linked_localities pll on pll.project_id = p.id
                    LEFT JOIN locality l on l.code = pll.locality_id
                    INNER JOIN district di on di.code = l.district_id
                    INNER JOIN department de on de.code = l.department_id
                WHERE 1 = 1
                {filter_conditions}
            ) cg
            GROUP BY cg.gender
            """
        filter_conditions = []
        if filter := request.GET.get("provider"):
            filter_conditions.append(f"and pc.entity_id = {filter}")
        if filter := request.GET.get("project"):
            filter_conditions.append(f"and p.id = {filter}")
        if filter := request.GET.get("construction_contract"):
            filter_conditions.append(f"and p.construction_contract_id = {filter}")
        if filter := request.GET.get("district"):
            filter_conditions.append(f"and l.district_id = '{filter}'")
        if filter := request.GET.get("department"):
            filter_conditions.append(f"and l.department_id = '{filter}'")
        if filter := request.GET.get("financing_program"):
            filter_conditions.append(f"and cc.financing_program_id = {filter}")
        if filter := request.GET.get("financing_fund"):
            filter_conditions.append(f"and fpff.financingfund_id = {filter}")

        cursor.execute(query.format(filter_conditions=" ".join(filter_conditions)))

        data = dictfetchall(cursor)
        for row in data:
            row["gender_name"] = dict(GENDER_CHOICES).get(row["gender"], row["gender"])
        return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_project_and_contract_stats(request, format=None):
    with connection.cursor() as cursor:
        query = """
            SELECT 'opened_projects' as name, COUNT(DISTINCT p.id) as total
            FROM project p
                LEFT JOIN construction_contract_contact ccc ON ccc.entity_id = p.construction_contract_id
                LEFT JOIN contact ct ON ct.id = ccc.contact_id
            WHERE p.closed = FALSE {project_filter_conditions}
            UNION
            SELECT 'opened_contracts' as name, COUNT(DISTINCT cc.id) as total
            FROM construction_contract cc
                LEFT JOIN construction_contract_contact ccc ON ccc.entity_id = cc.id
                LEFT JOIN contact ct ON ct.id = ccc.contact_id
            WHERE cc.closed = FALSE {contract_filter_conditions};
            """
        project_filter_conditions = []
        contract_filter_conditions = []
        if request.user.belongs_to([GROUP_EDICION, GROUP_GESTION]):
            project_filter_conditions.append(
                "AND (p.creation_user_id = {user_id} OR ct.user_id = {user_id})".format(
                    user_id=request.user.id
                )
            )
            contract_filter_conditions.append(
                "AND (cc.creation_user_id = {user_id} OR ct.user_id = {user_id})".format(
                    user_id=request.user.id
                )
            )

        cursor.execute(
            query.format(
                project_filter_conditions=" ".join(project_filter_conditions),
                contract_filter_conditions=" ".join(contract_filter_conditions),
            )
        )

        return Response(dictfetchall(cursor))


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_project_by_phase_stats(request, format=None):
    with connection.cursor() as cursor:
        query = """
        with project_phase as (
            select distinct on (p.id)
                p.id as project_id, m.name, m.phase
            from project p
                inner join milestone m on p.id = m.project_id
                left join project_linked_localities pll on pll.project_id = p.id
                left join locality l on l.code = pll.locality_id
                left join construction_contract cc on cc.id = p.construction_contract_id
                left join financing_program fp on fp.id = cc.financing_program_id
                left join financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
                LEFT JOIN construction_contract_contact ccc ON ccc.entity_id = p.construction_contract_id
                LEFT JOIN contact ct ON ct.id = ccc.contact_id
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
                "and cc.financing_program_id = {}".format(
                    request.GET.get("financing_program")
                )
            )
        if request.GET.get("financing_fund"):
            project_filter_conditions.append(
                " and fpff.financingfund_id = {}".format(
                    request.GET.get("financing_fund")
                )
            )
        if request.user.belongs_to([GROUP_EDICION, GROUP_GESTION]):
            project_filter_conditions.append(
                "AND (p.creation_user_id = {user_id} OR ct.user_id = {user_id})".format(
                    user_id=request.user.id
                )
            )

        cursor.execute(
            query.format(project_filter_conditions=" ".join(project_filter_conditions))
        )
        phases = dictfetchall(cursor)
        for phase in phases:
            phase["phase_name"] = dict(PHASE_CHOICES).get(
                phase["phase"], phase["phase"]
            )
        return Response(phases)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_projects_by_phase_map(request, format=None):
    with connection.cursor() as cursor:
        query = """
            select distinct on (p.id)
                    p.id as project_id,
                    i.latitude,
                    i.longitude,
                    l.name as locality,
                    di.name as district,
                    de.name as department,
                    m.name,
                    m.phase
            from project p
                inner join milestone m on p.id = m.project_id
                left join construction_contract cc on cc.id = p.construction_contract_id
                left join financing_program fp on fp.id = cc.financing_program_id
                left join financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
                left join infrastructure i on i.id = p.main_infrastructure_id
                left join project_linked_localities pll on pll.project_id = p.id
                left join locality l on l.code = pll.locality_id
                inner join district di on di.code = l.district_id
                inner join department de on de.code = l.department_id
                LEFT JOIN construction_contract_contact ccc ON ccc.entity_id = p.construction_contract_id
                LEFT JOIN contact ct ON ct.id = ccc.contact_id
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
                "and cc.financing_program_id = {}".format(
                    request.GET.get("financing_program")
                )
            )
        if request.GET.get("financing_fund"):
            project_filter_conditions.append(
                " and fpff.financingfund_id = {}".format(
                    request.GET.get("financing_fund")
                )
            )
        if request.user.belongs_to([GROUP_EDICION, GROUP_GESTION]):
            project_filter_conditions.append(
                "AND (p.creation_user_id = {user_id} OR ct.user_id = {user_id})".format(
                    user_id=request.user.id
                )
            )

        cursor.execute(
            query.format(project_filter_conditions=" ".join(project_filter_conditions))
        )
        phases = dictfetchall(cursor)
        for phase in phases:
            phase["phase_name"] = dict(PHASE_CHOICES).get(
                phase["phase"], phase["phase"]
            )
        return Response(phases)
