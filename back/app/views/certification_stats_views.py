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
def get_certification_stats(request, format=None):  # noqa: ARG001
    query = """
                WITH selected_certifications AS (
                SELECT
                    DISTINCT ON (cert.id)
                    cert.id,
                    cert.expected_amount,
                    cert.approved_amount,
                    pmt.name AS payment_name,
                    COALESCE(pmt.approval_date, pmt.expected_approval_date) AS payment_date
                FROM certification cert
                LEFT JOIN project p ON p.id = cert.project_id
                LEFT JOIN payment pmt ON pmt.id = cert.payment_id
                WHERE cert.active = True
                {filter_conditions}
            ), grouped_by_month_certifications AS (
                SELECT
                    certifications.payment_name AS payment_name,
                    DATE_TRUNC('month', certifications.payment_date) AS certification_month,
                    sum(certifications.expected_amount) AS month_expected_amount,
                    sum(certifications.approved_amount) AS month_approved_amount
                FROM selected_certifications certifications
                GROUP BY DATE_TRUNC('month', certifications.payment_date), certifications.payment_name
            )
            SELECT
                payment_name,
                to_char(coalesce(months.series_month, gmc.certification_month), 'MM-YYYY') as month,
                gmc.month_expected_amount,
                sum(gmc.month_expected_amount) OVER (ORDER BY coalesce(months.series_month, gmc.certification_month) rows BETWEEN UNBOUNDED PRECEDING AND current row) AS cum_expected_total_amount,
                gmc.month_approved_amount,
                sum(gmc.month_approved_amount) OVER (ORDER BY coalesce(months.series_month, gmc.certification_month) rows BETWEEN UNBOUNDED PRECEDING AND current row) AS cum_approved_total_amount
            FROM (
                SELECT generate_series(
                    date_trunc('month', '{start_date}'::date),
                    '{end_date}'::date,
                    '1 month'
                )::date as series_month
            ) months
            FULL JOIN grouped_by_month_certifications gmc ON gmc.certification_month = months.series_month
            ORDER BY coalesce(months.series_month, gmc.certification_month)
            """

    filter_conditions = []
    params = request.GET
    if filter := params.get("project"):
        filter_conditions.append(f"and p.id = {filter}")

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
