from datetime import datetime

import pandas as pd
from dateutil.relativedelta import relativedelta
from django.db import connection
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.base.views.renderers.dataframecsvfile import DataFrameCSVFileRenderer
from app.base.views.renderers.dataframeexcelfile import DataFrameExcelFileRenderer
from app.base.views.renderers.dataframejson import DataFrameJSONRenderer
from app.util import dictfetchall


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes([DataFrameJSONRenderer, DataFrameCSVFileRenderer])
def get_certification_stats_temporal(request, format=None):  # noqa: ARG001
    query = """
            WITH selected_certifications AS (
                SELECT
                    DISTINCT ON (crt.id)
                    crt.id,
                    cc.number as contract_number,
                    p.code as project_code,
                    pm.status,
                    pm.name as payment_name,
                    pm.expected_approval_date,
                    pm.approval_date,
                    crt.expected_amount,
                    crt.approved_amount
                FROM certification crt
                LEFT JOIN payment pm ON pm.id = crt.payment_id
                LEFT JOIN project p ON p.id = crt.project_id
                LEFT JOIN contract_project cp ON cp.project_id = p.id
                LEFT JOIN construction_contract cc ON cc.id = cp.contract_id AND 'ejecucion_de_obra' = ANY(cc.services) AND cc.closed = False
                LEFT JOIN financing_program fp on fp.id = cc.financing_program_id
                LEFT JOIN financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
                WHERE crt.active = True
                {filter_conditions}
            ), grouped_by_month_certifications as (
                SELECT
                    DATE_TRUNC('month', certifications.certification_date) AS certification_date,
                    string_agg(distinct certifications.payment_name, ', ') as payment_name,
                    sum(certifications.expected_amount) as month_expected_amount,
                    sum(certifications.approved_amount) as month_approved_amount
                FROM (
                        SELECT
                            sc.payment_name,
                            CASE
                                WHEN sc.status = 'aprobado' THEN sc.approval_date
                                ELSE sc.expected_approval_date
                            END AS certification_date,
                            CASE
                                WHEN sc.status = 'pendiente' THEN sc.expected_amount
                                ELSE null
                            END AS expected_amount,
                            CASE
                                WHEN sc.status = 'aprobado' THEN sc.approved_amount
                                ELSE null
                            END AS approved_amount
                        FROM selected_certifications sc
                    ) certifications
                GROUP BY DATE_TRUNC('month', certifications.certification_date)
            )
            SELECT
                coalesce(months.series_month, gmc.certification_date) as id,
                to_char(coalesce(months.series_month, gmc.certification_date), 'MM-YYYY') as month,
                gmc.payment_name,
                gmc.month_expected_amount,
                sum(gmc.month_expected_amount) OVER (ORDER BY coalesce(months.series_month, gmc.certification_date) rows BETWEEN UNBOUNDED PRECEDING AND current row) AS cum_expected_total_amount,
                gmc.month_approved_amount,
                sum(gmc.month_approved_amount) OVER (ORDER BY coalesce(months.series_month, gmc.certification_date) rows BETWEEN UNBOUNDED PRECEDING AND current row) AS cum_approved_total_amount
            FROM (
                SELECT generate_series(
                    date_trunc('month', '{start_date}'::date),
                    '{end_date}'::date,
                    '1 month'
                )::date as series_month
            ) months
            FULL JOIN grouped_by_month_certifications gmc ON gmc.certification_date = months.series_month
            ORDER BY coalesce(months.series_month, gmc.certification_date)
            """

    filter_conditions = []
    params = request.GET
    if filter := params.get("project"):
        filter_conditions.append(f"and p.id = {filter}")
    if filter := params.get("contract"):
        filter_conditions.append(f"and cc.id = {filter}")
    if filter := params.get("financing_program"):
        filter_conditions.append(f"and cc.financing_program_id = {filter}")
    if filter := params.get("financing_fund"):
        filter_conditions.append(f"and fpff.financingfund_id = {filter}")

    if params.get("start_date") and params.get("end_date"):
        start_date = params.get("start_date")
        end_date = params.get("end_date")
    else:
        end_date = datetime.now()
        start_date = end_date - relativedelta(years=2)

    with connection.cursor() as cursor:
        cursor.execute(
            query.format(
                filter_conditions=" ".join(filter_conditions),
                start_date=start_date,
                end_date=end_date,
            )
        )
        result = dictfetchall(cursor)
        return Response(result)


CERTIFICATIONS_EXPORT_FIELDS = {
    "contract_number": {"name": "Contrato", "type": "string", "width": 20},
    "project_code": {"name": "Cód. proyecto", "type": "string", "width": 20},
    "project_name": {"name": "Proyecto", "type": "string", "width": 30},
    "payment_name": {"name": "Certificación", "type": "string", "width": 30},
    "status_label": {"name": "Estado", "type": "string", "width": 15},
    "approval_date": {"name": "Fecha de aprobación", "type": "date", "width": 15},
    "approved_total_amount": {"name": "Monto aprobado", "type": "integer", "width": 15},
    "cum_approved_total_amount": {
        "name": "Monto aprobado (acum.)",
        "type": "integer",
        "width": 15,
    },
    "expected_approval_date": {
        "name": "Fecha prevista de aprobación",
        "type": "date",
        "width": 15,
    },
    "expected_total_amount": {"name": "Monto previsto", "type": "integer", "width": 15},
    "cum_expected_total_amount": {
        "name": "Monto aprobado (acum.)",
        "type": "integer",
        "width": 15,
    },
}


class CertificationsStatsCSVRenderer(DataFrameCSVFileRenderer):
    fields = CERTIFICATIONS_EXPORT_FIELDS


class CertificationsStatsExcelRenderer(DataFrameExcelFileRenderer):
    fields = CERTIFICATIONS_EXPORT_FIELDS


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes(
    [
        DataFrameJSONRenderer,
        CertificationsStatsCSVRenderer,
        CertificationsStatsExcelRenderer,
    ]
)
def get_certification_stats_totals(request, format=None):
    query = """
            WITH selected_certifications AS (
                SELECT
                    DISTINCT ON (crt.id)
                    crt.id,
                    cc.number as contract_number,
                    p.code as project_code,
                    (SELECT string_agg(l.name, ' - ') FROM locality l INNER JOIN project_linked_localities pll ON l.code = pll.locality_id WHERE pll.project_id = cp.project_id) as project_name,
                    pm.name as payment_name,
                    pm.status,
                    case when pm.status = 'pendiente'
                        then pm.expected_approval_date
                        else null
                    end as expected_approval_date,
                    case when pm.status = 'pendiente'
                        then crt.expected_amount
                        else null
                    end as expected_amount,
                    case when pm.status = 'aprobado'
                        then pm.approval_date
                        else null
                    end as approval_date,
                    case when pm.status = 'aprobado'
                        then crt.approved_amount
                        else null
                    end as approved_amount
                FROM certification crt
                LEFT JOIN payment pm ON pm.id = crt.payment_id
                LEFT JOIN project p ON p.id = crt.project_id
                LEFT JOIN contract_project cp ON cp.project_id = p.id
                LEFT JOIN construction_contract cc ON cc.id = cp.contract_id AND 'ejecucion_de_obra' = ANY(cc.services) AND cc.closed = False
                LEFT JOIN financing_program fp on fp.id = cc.financing_program_id
                LEFT JOIN financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
                WHERE crt.active = True
                {filter_conditions}
            )
            SELECT
                sc.id,
                sc.contract_number,
                sc.project_code,
                sc.project_name,
                sc.payment_name,
                sc.status,
                d_s.value as status_label,
                to_char(sc.expected_approval_date, 'yyyy-mm-dd') as expected_approval_date,
                sc.expected_amount as expected_total_amount,
                sum(sc.expected_amount) OVER (ORDER BY coalesce(sc.approval_date, sc.expected_approval_date) rows BETWEEN UNBOUNDED PRECEDING AND current row) AS cum_expected_total_amount,
                to_char(sc.approval_date, 'yyyy-mm-dd') as approval_date,
                sc.approved_amount as approved_total_amount,
                sum(sc.approved_amount) OVER (ORDER BY coalesce(sc.approval_date, sc.expected_approval_date) rows BETWEEN UNBOUNDED PRECEDING AND current row) AS cum_approved_total_amount
            FROM selected_certifications sc
            LEFT JOIN dominios d_s ON d_s.category = 'estado_producto' AND d_s."key" = sc.status
            """

    filter_conditions = []
    params = request.GET
    if filter := params.get("project"):
        filter_conditions.append(f"and p.id = {filter}")
    if filter := params.get("contract"):
        filter_conditions.append(f"and cc.id = {filter}")
    if filter := params.get("financing_program"):
        filter_conditions.append(f"and cc.financing_program_id = {filter}")
    if filter := params.get("financing_fund"):
        filter_conditions.append(f"and fpff.financingfund_id = {filter}")
    if filter := params.get("start_date"):
        filter_conditions.append(
            f"and coalesce(pm.approval_date, pm.expected_approval_date) >= '{filter}'"
        )
    if filter := params.get("end_date"):
        filter_conditions.append(
            f"and coalesce(pm.approval_date, pm.expected_approval_date) <= '{filter}'"
        )

    with connection.cursor() as cursor:
        cursor.execute(query.format(filter_conditions=" ".join(filter_conditions)))
        result = dictfetchall(cursor)

        calc_cols = [
            "expected_total_amount",
            "cum_expected_total_amount",
            "approved_total_amount",
            "cum_approved_total_amount",
        ]
        if not result:
            result_df = pd.DataFrame(
                [["total", 0, 0, 0, 0]], columns=["id", *calc_cols]
            )
            return Response(result_df)

        result_df = pd.DataFrame(result)

        result_df[calc_cols] = result_df[calc_cols].apply(
            pd.to_numeric, errors="coerce"
        )
        result_df.loc["Total"] = result_df[
            ["expected_total_amount", "approved_total_amount"]
        ].sum(numeric_only=True)

        result_df = result_df.where(pd.notna(result_df), None)

        result_df = result_df.astype(
            {
                "id": "Int64",
                "expected_approval_date": "datetime64[ns]",
                "approval_date": "datetime64[ns]",
            }
        )
        result_df.at["Total", "payment_name"] = "Total"
        data_list = result_df.to_dict(orient="list")

        return Response(data_list)
