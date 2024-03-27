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
