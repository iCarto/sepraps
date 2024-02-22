import pandas as pd
from django.db import connection
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.base.views.renderers.dataframecsvfile import DataFrameCSVFileRenderer
from app.base.views.renderers.dataframeexcelfile import DataFrameExcelFileRenderer
from app.base.views.renderers.dataframejson import DataFrameJSONRenderer
from app.util import dictfetchall


def get_filter_join_query(params):  # noqa: C901, PLR0912
    join_query = """
        SELECT DISTINCT ON (p.id) p.id as project_id
        FROM project p
        LEFT JOIN contract_project cp ON cp.project_id = p.id
        LEFT JOIN construction_contract cc on cc.id = cp.contract_id
        LEFT JOIN contract_supervision_area csa on csa.contract_id = cc.id
        LEFT JOIN financing_program fp on fp.id = cc.financing_program_id
        LEFT JOIN financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
        LEFT JOIN project_linked_localities pll on pll.project_id = p.id
        LEFT JOIN locality l on l.code = pll.locality_id
        INNER JOIN district di on di.code = l.district_id
        INNER JOIN department de on de.code = l.department_id
        WHERE p.closed = False
        {filter_conditions}
    """
    filter_conditions = []
    if filter_param := params.get("project"):
        filter_conditions.append(f"and p.id = {filter_param}")
    if filter_param := params.get("contract"):
        filter_conditions.append(f"and cc.id = {filter_param}")
    if filter_param := params.get("supervision_contract"):
        filter_conditions.append(f"and csa.supervision_contract_id = {filter_param}")
    if filter_param := params.get("district"):
        filter_conditions.append(f"and l.district_id = '{filter_param}'")
    if filter_param := params.get("department"):
        filter_conditions.append(f"and l.department_id = '{filter_param}'")
    if filter_param := params.get("financing_program"):
        filter_conditions.append(f"and cc.financing_program_id = {filter_param}")
    if filter_param := params.get("financing_fund"):
        filter_conditions.append(f"and fpff.financingfund_id = {filter_param}")

    return join_query.format(filter_conditions=" ".join(filter_conditions))


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes([DataFrameJSONRenderer, DataFrameCSVFileRenderer])
def get_building_components_stats(request, group_code, format=None):
    group_by_column = "bc.code_label"
    if request.GET.get("project"):
        group_by_column = "bc.name"
    if group_code == "component_code":
        group_by_column = "bc.code_label"

    name = group_by_column + " as name"

    if group_code == "project_code":
        group_by_column = "project.code, project.id"
        name = "CONCAT((SELECT string_agg(l.name, ' - ') FROM locality l INNER JOIN project_linked_localities pll ON l.code = pll.locality_id WHERE pll.project_id = project.id), ' - ', project.code) as name"

    query = """
            SELECT
                {name},
                coalesce(sum(bcm.expected_amount), 0) as expected_amount,
                coalesce(sum(bcm.paid_amount), 0) as paid_amount,
                coalesce(sum(bcm.pending_amount), 0) as pending_amount
            FROM building_component_monitoring bcm
                JOIN building_component bc on bc.id = bcm.building_component_id
                JOIN (
                    {join_query}
                ) projects ON projects.project_id = bcm.project_id
                LEFT JOIN project ON project.id = bcm.project_id
            WHERE bcm.active = True
            GROUP BY {group_by_column}
            ORDER BY {group_by_column}
            """

    with connection.cursor() as cursor:
        cursor.execute(
            query.format(
                name=name,
                group_by_column=group_by_column,
                join_query=get_filter_join_query(request.GET),
            )
        )
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
                round(((coalesce(sum(bcm.paid_amount), 0) / coalesce(nullif(coalesce(sum(bcm.paid_amount), 0) + coalesce(sum(bcm.pending_amount), 0),0),1)) * 100)::numeric) as paid_real_percentage,
                round(coalesce(avg(coalesce(bcm.paid_amount/ nullif(bcm.expected_amount, 0), 0) * 100), 0)) as financial_progress_percentage,
                round(coalesce(avg(coalesce(bcm.physical_progress_percentage, 0)), 0)) as physical_progress_percentage
            FROM building_component_monitoring bcm
                JOIN building_component bc on bc.id = bcm.building_component_id
                JOIN (
                    {join_query}
                ) projects ON projects.project_id = bcm.project_id
            WHERE bcm.active = True
            """

    with connection.cursor() as cursor:
        cursor.execute(query.format(join_query=get_filter_join_query(request.GET)))
        # result = cursor.fetchall()
        columns = cursor.description or []
        result = [
            {columns[index][0]: column for index, column in enumerate(value)}
            for value in cursor.fetchall()
        ]

        return JsonResponse(result[0])


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes([DataFrameJSONRenderer])
def get_social_component_trainings_multi_stats(request, group_code, format=None):
    group_by_attribute = "scm.code"
    if group_code == "target_population":
        group_by_attribute = "sct.target_population"
    elif group_code == "method":
        group_by_attribute = "sct.method"

    code = group_by_attribute + " as code"

    if group_code == "project_code":
        group_by_attribute = "project.code, project.id"
        code = "CONCAT((SELECT string_agg(l.name, ' - ') FROM locality l INNER JOIN project_linked_localities pll ON l.code = pll.locality_id WHERE pll.project_id = project.id), ' - ', project.code) as code"

    query = """
            SELECT
                {code},
                sum(number_of_women) as number_of_women,
                sum(number_of_men) as number_of_men,
                (sum(number_of_women) + sum(number_of_men)) as number_of_participants,
                (cast(sum(number_of_women) as decimal) / (sum(number_of_women) + sum(number_of_men))) * 100 as women_percentage,
                sum(number_of_hours) as number_of_hours,
                count(*) as number_of_trainings
            FROM social_component_training sct
                INNER JOIN social_component_monitoring scm ON scm.id = sct.social_component_monitoring_id
                JOIN (
                    {join_query}
                ) projects ON projects.project_id = scm.project_id
                LEFT JOIN project ON project.id = scm.project_id
            WHERE sct.active = True and scm.active = True
            GROUP BY {group_by_attribute}
            ORDER BY {group_by_attribute}
            """

    with connection.cursor() as cursor:
        cursor.execute(
            query.format(
                code=code,
                group_by_attribute=group_by_attribute,
                join_query=get_filter_join_query(request.GET),
            )
        )
        result = dictfetchall(cursor)

        if not result:
            result_df = pd.DataFrame(
                [["total", 0, 0, 0, 0, 0, 0]],
                columns=[
                    "code",
                    "number_of_women",
                    "number_of_men",
                    "number_of_participants",
                    "women_percentage",
                    "number_of_hours",
                    "number_of_trainings",
                ],
            )
            return Response(result_df)

        result_df = pd.DataFrame(result)
        result_df.loc["Total"] = result_df[
            [
                "number_of_women",
                "number_of_men",
                "number_of_participants",
                "number_of_hours",
                "number_of_trainings",
            ]
        ].sum(numeric_only=True)

        result_df.at["Total", "women_percentage"] = (
            result_df["number_of_women"].sum()
            / result_df["number_of_participants"].sum()
        ) * 100

        result_df.at["Total", "code"] = "total"

        return Response(result_df)


TRAINING_STATS_SUM_EXPORT_FIELDS = {
    "social_component_monitoring_name": {
        "name": "Componente",
        "type": "string",
        "width": 50,
    },
    "project_code": {"name": "Proyecto", "type": "string", "width": 15},
    "contract_number": {"name": "Contrato", "type": "string", "width": 15},
    "contractor_name": {"name": "Contratista", "type": "string", "width": 20},
    "start_date": {"name": "Fecha de inicio", "type": "date", "width": 15},
    "end_date": {"name": "Fecha de fin", "type": "date", "width": 15},
    "method_label": {"name": "Método", "type": "string", "width": 15},
    "target_population_label": {
        "name": "Población meta",
        "type": "string",
        "width": 25,
    },
    "number_of_participants": {"name": "Participantes", "type": "integer", "width": 15},
    "number_of_women": {"name": "Mujeres", "type": "integer", "width": 15},
    "women_percentage": {"name": "% Mujeres", "type": "float", "width": 15},
    "number_of_hours": {"name": "Horas", "type": "integer", "width": 10},
    "number_of_digital_materials": {
        "name": "Materiales digitales",
        "type": "integer",
        "width": 15,
    },
    "number_of_printed_materials": {
        "name": "Materiales impresos",
        "type": "integer",
        "width": 15,
    },
}


class TrainingSumStatsCSVRenderer(DataFrameCSVFileRenderer):
    fields = TRAINING_STATS_SUM_EXPORT_FIELDS


class TrainingSumStatsExcelRenderer(DataFrameExcelFileRenderer):
    fields = TRAINING_STATS_SUM_EXPORT_FIELDS


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes(
    [DataFrameJSONRenderer, TrainingSumStatsCSVRenderer, TrainingSumStatsExcelRenderer]
)
def get_social_component_trainings_sum_stats(request, format=None):
    social_component_monitoring = request.GET.get("social_component_monitoring", None)
    social_component_contract = request.GET.get("social_component_contract", None)
    social_component_contractor = request.GET.get("social_component_contractor", None)

    query = """
            SELECT
                sct.id,
                to_char(sct.start_date, 'yyyy-mm-dd') as start_date,
                to_char(sct.end_date, 'yyyy-mm-dd') as end_date,
                sct.method,
                d_method.value as method_label,
                sct.target_population,
                (SELECT array_agg(d.value) FROM dominios d WHERE d."key" = ANY(sct.target_population)) AS target_population_label,
                coalesce(sct.number_of_women,0) + coalesce(sct.number_of_men, 0) as number_of_participants,
                sct.number_of_women,
                round((cast(number_of_women as decimal) / (coalesce(sct.number_of_women,0) + coalesce(sct.number_of_men, 0))) * 100, 2)::numeric as women_percentage,
                sct.number_of_hours,
                sct.number_of_digital_materials,
                sct.number_of_printed_materials,
                cc2.number as contract_number,
                cc2.id as contract_id,
                c.name as contractor_name,
                c.id as contractor_id,
                scm.name as social_component_monitoring_name,
                scm.id as social_component_monitoring_id,
                CONCAT((SELECT string_agg(l.name, ' - ') FROM locality l INNER JOIN project_linked_localities pll ON l.code = pll.locality_id WHERE pll.project_id = project.id), ' - ', project.code) as project_code,
                project.id as project_id
            FROM social_component_training sct
                INNER JOIN social_component_monitoring scm ON scm.id = sct.social_component_monitoring_id
                JOIN (
                    {join_query}
                ) projects ON projects.project_id = scm.project_id
                LEFT JOIN construction_contract cc2 on cc2.id = sct.contract_id
                LEFT JOIN contractor c on c.id = sct.contractor_id
                LEFT JOIN dominios d_method on d_method."key" = sct."method"
                LEFT JOIN project ON project.id = scm.project_id
            WHERE sct.active = True and scm.active = True
            """

    if social_component_monitoring:
        query += f" AND scm.id = {social_component_monitoring}"
    if social_component_contract:
        query += f" AND cc2.id = {social_component_contract}"
    if social_component_contractor:
        query += f" AND c.id = {social_component_contractor}"

    with connection.cursor() as cursor:
        cursor.execute(query.format(join_query=get_filter_join_query(request.GET)))
        result = dictfetchall(cursor)

        if not result:
            result_df = pd.DataFrame(
                [["total", 0, 0, 0, 0]],
                columns=[
                    "code",
                    "number_of_women",
                    "number_of_men",
                    "women_percentage",
                    "number_of_hours",
                ],
            )
            return Response(result_df)

        result_df = pd.DataFrame(result)
        result_df.loc["Total"] = result_df[
            [
                "number_of_women",
                "number_of_participants",
                "number_of_hours",
                "number_of_digital_materials",
                "number_of_printed_materials",
            ]
        ].sum(numeric_only=True)
        result_df.at["Total", "women_percentage"] = (
            result_df["number_of_women"].sum()
            / result_df["number_of_participants"].sum()
        ) * 100

        # Convert to nullable integers
        result_df = result_df.astype(
            {
                "id": "Int64",
                "start_date": "datetime64[ns]",
                "end_date": "datetime64[ns]",
                "social_component_monitoring_id": "Int64",
                "contract_id": "Int64",
                "contractor_id": "Int64",
                "project_id": "Int64",
                "number_of_women": "Int64",
                "number_of_participants": "Int64",
                "number_of_hours": "Int64",
                "number_of_digital_materials": "Int64",
                "number_of_printed_materials": "Int64",
            }
        )
        result_df.at["Total", "social_component_monitoring_name"] = "Total"

        return Response(result_df)


CONNECTIONS_STATS_SUM_EXPORT_FIELDS = {
    "project_code": {"name": "Proyecto", "type": "string", "width": 50},
    "population": {"name": "Habitantes", "type": "integer", "width": 15},
    "number_of_households": {
        "name": "Viviendas totales",
        "type": "integer",
        "width": 15,
    },
    "number_of_planned_connections": {
        "name": "Conexiones previstas",
        "type": "integer",
        "width": 15,
    },
    "number_of_actual_connections": {
        "name": "Conexiones reales",
        "type": "integer",
        "width": 15,
    },
    "connected_households_percentage": {
        "name": "Viviendas conectadas",
        "type": "float",
        "width": 15,
    },
}


class ConnectionsSumStatsCSVRenderer(DataFrameCSVFileRenderer):
    fields = CONNECTIONS_STATS_SUM_EXPORT_FIELDS


class ConnectionsSumStatsExcelRenderer(DataFrameExcelFileRenderer):
    fields = CONNECTIONS_STATS_SUM_EXPORT_FIELDS


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes(
    [
        DataFrameJSONRenderer,
        ConnectionsSumStatsCSVRenderer,
        ConnectionsSumStatsExcelRenderer,
    ]
)
def get_connections_total_stats(request, format=None):
    number_of_people_per_household = 5

    query = """
            SELECT
                conn.id as id,
                conn.number_of_households * %(people_per_household)s as population,
                conn.number_of_planned_connections as number_of_planned_connections,
                conn.number_of_actual_connections as number_of_actual_connections,
                conn.number_of_households as number_of_households,
                round((cast(coalesce(conn.number_of_actual_connections, 0) + coalesce(conn.number_of_existing_connections, 0) as decimal) / coalesce(conn.number_of_households, 1)) * 100, 2)::numeric as connected_households_percentage,
                CONCAT((SELECT string_agg(l.name, ' - ') FROM locality l INNER JOIN project_linked_localities pll ON l.code = pll.locality_id WHERE pll.project_id = project.id), ' - ', project.code) as project_code
            FROM connection conn
                JOIN (
                    {join_query}
                ) projects ON projects.project_id = conn.project_id
                JOIN project ON conn.project_id = project.id
            WHERE conn.active = True
            """

    with connection.cursor() as cursor:
        cursor.execute(
            query.format(join_query=get_filter_join_query(request.GET)),
            {"people_per_household": number_of_people_per_household},
        )
        result = dictfetchall(cursor)

        if not result:
            result_df = pd.DataFrame(
                [["total", 0, 0, 0, 0, 0, 0]],
                columns=[
                    "id",
                    "project_code",
                    "population",
                    "number_of_planned_connections",
                    "number_of_actual_connections",
                    "number_of_households",
                    "connected_households_percentage",
                ],
            )
            return Response(result_df)

        result_df = pd.DataFrame(result)

        result_df.loc["Total"] = result_df[
            [
                "population",
                "number_of_planned_connections",
                "number_of_actual_connections",
                "number_of_households",
            ]
        ].sum(numeric_only=True)

        result_df.at["Total", "connected_households_percentage"] = result_df[
            "connected_households_percentage"
        ].mean()

        # Convert to nullable integers
        result_df = result_df.astype(
            {
                "id": "Int64",
                "population": "Int64",
                "number_of_planned_connections": "Int64",
                "number_of_actual_connections": "Int64",
                "number_of_households": "Int64",
            }
        )

        result_df = result_df.where(pd.notna(result_df), None)
        result_df.at["Total", "project_code"] = "Total"
        data_list = result_df.to_dict(orient="list")

        return Response(data_list)
