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
@renderer_classes([DataFrameJSONRenderer])
def get_payment_stats_temporal(request, format=None):
    query = """
            WITH selected_payments AS (
                SELECT
                    DISTINCT ON (pm.id)
                    pm.id,
                    pm.name,
                    pm.status,
                    pm.expected_approval_date,
                    pm.expected_total_amount,
                    pm.approval_date,
                    pm.paid_total_amount
                FROM payment pm
                LEFT JOIN construction_contract cc on cc.id = pm.contract_id
                LEFT JOIN financing_program fp on fp.id = cc.financing_program_id
                LEFT JOIN financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
                WHERE pm.active = True
                {filter_conditions}
            ), grouped_by_month_payments as (
                SELECT
                    DATE_TRUNC('month', payments.payment_date) AS payment_date,
                    string_agg(payments.name, ', ') as payment_name,
                    sum(payments.expected_amount) as month_expected_amount,
                    sum(payments.approved_amount) as month_approved_amount
                FROM (
                        SELECT
                            sp.name,
                            CASE
                                WHEN sp.status = 'aprobado' THEN sp.approval_date
                                ELSE sp.expected_approval_date
                            END AS payment_date,
                            CASE
                                WHEN sp.status = 'pendiente' THEN sp.expected_total_amount
                                ELSE null
                            END AS expected_amount,
                            CASE
                                WHEN sp.status = 'aprobado' THEN sp.paid_total_amount
                                ELSE null
                            END AS approved_amount
                        FROM selected_payments sp
                    ) payments
                GROUP BY DATE_TRUNC('month', payments.payment_date)
            )
            SELECT
	            coalesce(months.series_month, gmp.payment_date) as id,
	            to_char(coalesce(months.series_month, gmp.payment_date), 'MM-YYYY') as month,
                gmp.payment_name,
                gmp.month_expected_amount,
                sum(gmp.month_expected_amount) OVER (ORDER BY coalesce(months.series_month, gmp.payment_date) rows BETWEEN UNBOUNDED PRECEDING AND current row) AS cum_expected_total_amount,
                gmp.month_approved_amount,
                sum(gmp.month_approved_amount) OVER (ORDER BY coalesce(months.series_month, gmp.payment_date) rows BETWEEN UNBOUNDED PRECEDING AND current row) AS cum_approved_total_amount
            FROM (
                SELECT generate_series(
                    date_trunc('month', '{start_date}'::date),
                    '{end_date}'::date,
                    '1 month'
                )::date as series_month
            ) months
            FULL JOIN grouped_by_month_payments gmp ON gmp.payment_date = months.series_month
            ORDER BY coalesce(months.series_month, gmp.payment_date)
            """

    filter_conditions = []
    params = request.GET
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


PAYMENTS_EXPORT_FIELDS = {
    "contract_number": {"name": "Contrato", "type": "string", "width": 20},
    "payment_name": {"name": "Producto", "type": "string", "width": 30},
    "status_label": {"name": "Estado", "type": "string", "width": 15},
    "num_products": {"name": "Entregables", "type": "integer", "width": 15},
    "approval_date": {"name": "Fecha de aprobación", "type": "date", "width": 15},
    "paid_total_amount": {"name": "Monto aprobado", "type": "integer", "width": 15},
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


class PaymentsStatsCSVRenderer(DataFrameCSVFileRenderer):
    fields = PAYMENTS_EXPORT_FIELDS


class PaymentsStatsExcelRenderer(DataFrameExcelFileRenderer):
    fields = PAYMENTS_EXPORT_FIELDS


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes(
    [DataFrameJSONRenderer, PaymentsStatsCSVRenderer, PaymentsStatsExcelRenderer]
)
def get_payment_stats_totals(request, format=None):
    query = """
            WITH selected_payments AS (
                SELECT
                    DISTINCT ON (pm.id)
                    pm.id,
                    cc.number as contract_number,
                    pm."name" as payment_name,
                    pm.status,
                    case when pm.status = 'pendiente'
                        then pm.expected_approval_date
                        else null
                    end as expected_approval_date,
                    case when pm.status = 'pendiente'
                        then pm.expected_total_amount
                        else null
                    end as expected_total_amount,
                    pm.approval_date,
                    pm.paid_total_amount,
                    (SELECT COUNT(*) FROM product pr WHERE pr.payment_id = pm.id) as num_products
                FROM payment pm
                LEFT JOIN construction_contract cc on cc.id = pm.contract_id
                LEFT JOIN financing_program fp on fp.id = cc.financing_program_id
                LEFT JOIN financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
                WHERE pm.active = True
                {filter_conditions}
            )
            SELECT
                sp.id,
                sp.contract_number,
                sp.payment_name,
                sp.status,
                d_s.value as status_label,
                sp.num_products,
                to_char(sp.expected_approval_date, 'yyyy-mm-dd') as expected_approval_date,
                sp.expected_total_amount,
                sum(sp.expected_total_amount) OVER (ORDER BY coalesce(sp.approval_date, sp.expected_approval_date) rows BETWEEN UNBOUNDED PRECEDING AND current row) AS cum_expected_total_amount,
                to_char(sp.approval_date, 'yyyy-mm-dd') as approval_date,
                sp.paid_total_amount,
                sum(sp.paid_total_amount) OVER (ORDER BY coalesce(sp.approval_date, sp.expected_approval_date) rows BETWEEN UNBOUNDED PRECEDING AND current row) AS cum_approved_total_amount
            FROM selected_payments sp
            LEFT JOIN dominios d_s ON d_s.category = 'estado_producto' AND d_s."key" = sp.status
            """

    filter_conditions = []
    params = request.GET
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
            "num_products",
            "expected_total_amount",
            "cum_expected_total_amount",
            "paid_total_amount",
            "cum_approved_total_amount",
        ]
        if not result:
            result_df = pd.DataFrame(
                [["total", 0, 0, 0, 0, 0]], columns=["id", *calc_cols]
            )
            return Response(result_df)

        result_df = pd.DataFrame(result)

        result_df[calc_cols] = result_df[calc_cols].apply(
            pd.to_numeric, errors="coerce"
        )
        result_df.loc["Total"] = result_df[
            ["num_products", "expected_total_amount", "paid_total_amount"]
        ].sum(numeric_only=True)

        result_df = result_df.where(pd.notna(result_df), None)

        result_df = result_df.astype(
            {
                "id": "Int64",
                "expected_approval_date": "datetime64[ns]",
                "approval_date": "datetime64[ns]",
                "num_products": "Int64",
            }
        )
        result_df.at["Total", "payment_name"] = "Total"
        data_list = result_df.to_dict(orient="list")

        return Response(data_list)
