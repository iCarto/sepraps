from django.db import connection
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.util import dictfetchall
from users.constants import GROUP_EDICION, GROUP_GESTION


def create_event(type, date, title, message, url):
    return {
        "id": type + "-" + title,
        "date": date,
        "type": type,
        "title": title,
        "message": message,
        "url": url,
    }


def get_end_of_contract_events(filters, user):
    if filter := filters.get("project"):
        # These events aren't applied for projects
        return []
    with connection.cursor() as cursor:
        query = """
            SELECT DISTINCT
                cc.id as contract_id,
                cc.number as contract_number,
                (cc.execution_certificate_start_date + CAST(cc.expected_execution_period||' days' AS Interval))::date as expected_end_date,
                DATE_PART('day', cc.execution_certificate_start_date + CAST(cc.expected_execution_period||' days' AS Interval) - current_date)::int as days_left
            FROM construction_contract cc
                LEFT JOIN construction_contract_contact ccc ON ccc.entity_id = cc.id
                LEFT JOIN contact ct ON ct.id = ccc.contact_id
            WHERE cc.execution_certificate_start_date + CAST(cc.expected_execution_period||' days' AS Interval) >= current_date
            {filter_conditions}
            """
        filter_conditions = []
        filter_conditions_params = []
        if filter := filters.get("construction_contracts"):
            filter_conditions.append("and cc.id = ANY(%s)")
            filter_conditions_params.append(filter)
        if user.belongs_to([GROUP_EDICION, GROUP_GESTION]):
            filter_conditions.append(
                "AND (cc.creation_user_id = {user_id} OR ct.user_id = {user_id})".format(
                    user_id=user.id
                )
            )

        cursor.execute(
            query.format(filter_conditions=" ".join(filter_conditions)),
            filter_conditions_params,
        )

        data = dictfetchall(cursor)
        events = []
        for row in data:
            events.append(
                create_event(
                    "end_of_contract",
                    row["expected_end_date"],
                    "Contrato {}".format(row["contract_number"]),
                    "El plazo previsto de ejecución de este contrato finalizará dentro"
                    " de {} días".format(row["days_left"]),
                    "contracts/{}/phases".format(row["contract_id"]),
                )
            )
        return events


def get_end_of_warranty_events(filters, user):
    if filter := filters.get("project"):
        # These events aren't applied for projects
        return []
    with connection.cursor() as cursor:
        query = """
            SELECT DISTINCT
                cc.id as contract_id,
                cc.number as contract_number,
                cc.warranty_end_date,
                DATE_PART('day', cc.warranty_end_date::timestamp - current_date)::int as days_left
            FROM construction_contract cc
                LEFT JOIN construction_contract_contact ccc ON ccc.entity_id = cc.id
                LEFT JOIN contact ct ON ct.id = ccc.contact_id
            WHERE cc.warranty_end_date >= current_date
            {filter_conditions}
            """
        filter_conditions = []
        filter_conditions_params = []
        if filter := filters.get("construction_contracts"):
            filter_conditions.append("and cc.id = ANY(%s)")
            filter_conditions_params.append(filter)
        if user.belongs_to([GROUP_EDICION, GROUP_GESTION]):
            filter_conditions.append(
                "AND (cc.creation_user_id = {user_id} OR ct.user_id = {user_id})".format(
                    user_id=user.id
                )
            )

        cursor.execute(
            query.format(filter_conditions=" ".join(filter_conditions)),
            filter_conditions_params,
        )

        data = dictfetchall(cursor)
        events = []
        for row in data:
            events.append(
                create_event(
                    "end_of_warranty",
                    row["warranty_end_date"],
                    "Contrato {}".format(row["contract_number"]),
                    "El periodo de garantía de este contrato finalizará dentro de {}"
                    " días".format(row["days_left"]),
                    "contracts/{}/phases".format(row["contract_id"]),
                )
            )
        return events


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_coming_events(request, format=None):
    filter = {}
    if filter_param := request.GET.get("project"):
        filter["project"] = filter_param
    if filter_param := request.GET.get("construction_contract"):
        filter["construction_contract"] = filter_param

    events = []
    events += get_end_of_warranty_events(filter, request.user)
    events += get_end_of_contract_events(filter, request.user)
    return Response(events)
