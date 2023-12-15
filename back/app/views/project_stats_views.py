import pandas as pd
from django.db import connection
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.base.views.renderers import DataFrameCSVFileRenderer, DataFrameJSONRenderer
from app.util import dictfetchall


def get_filter_join_query(params):
    join_query = """
        SELECT DISTINCT ON (p.id) p.id as project_id
        FROM project p
        LEFT JOIN construction_contract cc on cc.id = p.construction_contract_id
	    LEFT JOIN contract_supervision_area csa on csa.code = 'building' and csa.contract_id = cc.id
        LEFT JOIN financing_program fp on fp.id = cc.financing_program_id
        LEFT JOIN financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
        LEFT JOIN project_linked_localities pll on pll.project_id = p.id
        LEFT JOIN locality l on l.code = pll.locality_id
        INNER JOIN district di on di.code = l.district_id
        INNER JOIN department de on de.code = l.department_id
        WHERE 1 = 1
        {filter_conditions}
    """
    filter_conditions = []
    if filter := params.get("project"):
        filter_conditions.append(f"and p.id = {filter}")
    if filter := params.get("contract"):
        filter_conditions.append(f"and p.construction_contract_id = {filter}")
    if filter := params.get("supervision_contract"):
        filter_conditions.append(f"and csa.supervision_contract_id = {filter}")
    if filter := params.get("district"):
        filter_conditions.append(f"and l.district_id = '{filter}'")
    if filter := params.get("department"):
        filter_conditions.append(f"and l.department_id = '{filter}'")
    if filter := params.get("financing_program"):
        filter_conditions.append(f"and cc.financing_program_id = {filter}")
    if filter := params.get("financing_fund"):
        filter_conditions.append(f"and fpff.financingfund_id = {filter}")

    return join_query.format(filter_conditions=" ".join(filter_conditions))


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes([DataFrameJSONRenderer, DataFrameCSVFileRenderer])
def get_building_components_stats(request, format=None):
    query = """
            SELECT
                bc.code,
                coalesce(sum(bcm.expected_amount), 0) as expected_amount,
                coalesce(sum(bcm.paid_amount), 0) as paid_amount,
                coalesce(sum(bcm.pending_amount), 0) as pending_amount
            FROM building_component_monitoring bcm
                JOIN building_component bc on bc.id = bcm.building_component_id
                JOIN (
                    {join_query}
                ) projects ON projects.project_id = bcm.project_id
            GROUP BY bc.code
            ORDER BY bc.code
            """

    with connection.cursor() as cursor:
        cursor.execute(query.format(join_query=get_filter_join_query(request.GET)))
        result = dictfetchall(cursor)

        return Response(result)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_building_components_total_stats(request, format=None):
    query = """
            SELECT
                coalesce(sum(bcm.paid_amount), 0) as paid_amount,
                coalesce(sum(bcm.pending_amount), 0) as pending_amount,
                coalesce(sum(bcm.expected_amount), 0) as expected_amount,
                coalesce(sum(bcm.paid_amount), 0) + coalesce(sum(bcm.pending_amount), 0) as real_amount,
                round((((coalesce(sum(bcm.paid_amount), 0) + coalesce(sum(bcm.pending_amount), 0)) / coalesce(nullif(sum(bcm.expected_amount), 0),1)) * 100)::numeric) as real_expected_percentage,
                round(((coalesce(sum(bcm.paid_amount), 0) / coalesce(nullif(sum(bcm.expected_amount), 0), 1)) * 100)::numeric) as paid_expected_percentage,
                round(((coalesce(sum(bcm.paid_amount), 0) / coalesce(nullif(coalesce(sum(bcm.paid_amount), 0) + coalesce(sum(bcm.pending_amount), 0),0),1)) * 100)::numeric) as paid_real_percentage
            FROM building_component_monitoring bcm
                JOIN building_component bc on bc.id = bcm.building_component_id
                JOIN (
                    {join_query}
                ) projects ON projects.project_id = bcm.project_id
            """

    with connection.cursor() as cursor:
        cursor.execute(query.format(join_query=get_filter_join_query(request.GET)))
        # result = cursor.fetchall()
        columns = cursor.description
        result = [
            {columns[index][0]: column for index, column in enumerate(value)}
            for value in cursor.fetchall()
        ]

        return JsonResponse(result[0])


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes([DataFrameJSONRenderer, DataFrameCSVFileRenderer])
def get_social_component_trainings_stats(request, group_code, format=None):
    group_by_attribute = "scm.code"
    if group_code == "target_population":
        group_by_attribute = "sct.target_population"
    elif group_code == "method":
        group_by_attribute = "sct.method"

    query = """
            SELECT
                {group_by_attribute} as code,
                sum(number_of_women) as number_of_women,
                sum(number_of_men) as number_of_men,
                round((cast(sum(number_of_women) as decimal) / (sum(number_of_women) + sum(number_of_men))) * 100)::numeric as women_percentage,
                sum(number_of_hours) as number_of_hours
            FROM social_component_training sct
                INNER JOIN social_component_monitoring scm ON scm.id = sct.social_component_monitoring_id
                JOIN (
                    {join_query}
                ) projects ON projects.project_id = scm.project_id
            GROUP BY {group_by_attribute}
            ORDER BY {group_by_attribute}
            """

    with connection.cursor() as cursor:
        cursor.execute(
            query.format(
                group_by_attribute=group_by_attribute,
                join_query=get_filter_join_query(request.GET),
            )
        )
        result = dictfetchall(cursor)

        if not result:
            df = pd.DataFrame(
                [["total", 0, 0, 0, 0]],
                columns=[
                    "code",
                    "number_of_women",
                    "number_of_men",
                    "women_percentage",
                    "number_of_hours",
                ],
            )
            return Response(df)

        df = pd.DataFrame(result)
        df.loc["Total"] = df[
            ["number_of_women", "number_of_men", "number_of_hours"]
        ].sum(numeric_only=True)
        df.at["Total", "women_percentage"] = df["women_percentage"].mean()
        df.at["Total", "code"] = "total"

        return Response(df)
