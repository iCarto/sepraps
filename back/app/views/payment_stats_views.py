from datetime import datetime

from dateutil.relativedelta import relativedelta
from django.db import connection
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.base.views.renderers.dataframecsvfile import DataFrameCSVFileRenderer
from app.base.views.renderers.dataframejson import DataFrameJSONRenderer
from app.util import dictfetchall


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes([DataFrameJSONRenderer, DataFrameCSVFileRenderer])
def get_payment_stats(request, format=None):
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
