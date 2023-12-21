from django.db import connection
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.base.views.renderers import DataFrameCSVFileRenderer, DataFrameJSONRenderer
from app.util import dictfetchall


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@renderer_classes([DataFrameJSONRenderer, DataFrameCSVFileRenderer])
def get_payment_stats(request, format=None):
    query = """
            WITH contract_last_payment AS (
                SELECT
                    contracts.contract_id,
                    contracts.contract_expected_total_amount,
                    max(pm.approval_date) as last_approval_date,
                    sum(pm.paid_total_amount) as contract_paid_total_amount
                FROM payment pm
                    JOIN (
                        SELECT
                            DISTINCT ON (cc.id)
                            cc.id as contract_id,
                            cc.awarding_budget as contract_expected_total_amount
                        FROM construction_contract cc
                        LEFT JOIN financing_program fp on fp.id = cc.financing_program_id
                        LEFT JOIN financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
                        LEFT JOIN payment pm on pm.contract_id = cc.id
                        WHERE 1 = 1
                        {filter_conditions}
                    ) contracts ON contracts.contract_id = pm.contract_id
                GROUP BY contracts.contract_id, contracts.contract_expected_total_amount
            )
            SELECT
                payments.name,
                CASE
                    WHEN payments.status != 'no_pagado'
                        THEN sum(payments.paid_total_amount) OVER (ORDER BY payments.expected_approval_date rows BETWEEN UNBOUNDED PRECEDING AND current row)
                    ELSE null
                END AS cum_paid_total_amount,
                sum(payments.new_expected_total_amount) OVER (ORDER BY payments.expected_approval_date rows BETWEEN UNBOUNDED PRECEDING AND current row) AS cum_expected_total_amount,
                payments.contract_expected_total_amount,
                payments.contract_paid_total_amount
            FROM (
                SELECT
                    *,
                    CASE
                        WHEN status = 'no_pagado' THEN expected_total_amount
                        ELSE paid_total_amount
                    END as new_expected_total_amount
                FROM payment pm
                JOIN contract_last_payment clp ON clp.contract_id = pm.contract_id
            ) payments
            """

    filter_conditions = []
    params = request.GET
    if filter := params.get("contract"):
        filter_conditions.append(f"and cc.id = {filter}")
    if filter := params.get("financing_program"):
        filter_conditions.append(f"and cc.financing_program_id = {filter}")
    if filter := params.get("financing_fund"):
        filter_conditions.append(f"and fpff.financingfund_id = {filter}")

    with connection.cursor() as cursor:
        cursor.execute(query.format(filter_conditions=" ".join(filter_conditions)))
        result = dictfetchall(cursor)

        return Response(result)
