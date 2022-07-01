from django.db import connection
from monitoring.models.contact import GENDER_CHOICES
from monitoring.util import dictfetchall
from questionnaires import services as questtionnaire_services
from questionnaires.models.monthly_questionnaire_instance import (
    MonthlyQuestionnaireInstance,
)
from questionnaires.renderers import DataFrameCSVFileRenderer, DataFrameJSONRenderer
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from users.permissions import GestionPermission, SupervisionPermission


@api_view(["GET"])
@permission_classes([IsAuthenticated, SupervisionPermission | GestionPermission])
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
        filter_conditions.append("and pqi.project_id = {}".format(filter))
    if filter := request.GET.get("construction_contract"):
        show_expanded = True
        filter_conditions.append("and p.construction_contract_id = {}".format(filter))
    if filter := request.GET.get("district"):
        filter_conditions.append("and l.district_id = '{}'".format(filter))
    if filter := request.GET.get("department"):
        filter_conditions.append("and l.department_id = '{}'".format(filter))
    if filter := request.GET.get("financing_program"):
        filter_conditions.append("and cc.financing_program_id = {}".format(filter))
    if filter := request.GET.get("financing_fund"):
        filter_conditions.append("and fpff.financingfund_id = {}".format(filter))
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
@permission_classes([IsAuthenticated, SupervisionPermission | GestionPermission])
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
            filter_conditions.append("and pc.entity_id = {}".format(filter))
        if filter := request.GET.get("project"):
            filter_conditions.append("and p.id = {}".format(filter))
        if filter := request.GET.get("construction_contract"):
            filter_conditions.append(
                "and p.construction_contract_id = {}".format(filter)
            )
        if filter := request.GET.get("district"):
            filter_conditions.append("and l.district_id = '{}'".format(filter))
        if filter := request.GET.get("department"):
            filter_conditions.append("and l.department_id = '{}'".format(filter))
        if filter := request.GET.get("financing_program"):
            filter_conditions.append("and cc.financing_program_id = {}".format(filter))
        if filter := request.GET.get("financing_fund"):
            filter_conditions.append("and fpff.financingfund_id = {}".format(filter))

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
            SELECT 'opened_projects' as name, COUNT(*) as total FROM project p WHERE p.closed = FALSE
            UNION
            SELECT 'opened_contracts' as name, COUNT(*) as total FROM construction_contract cc WHERE cc.closed = FALSE;
            """
        cursor.execute(query)

        return Response(dictfetchall(cursor))
