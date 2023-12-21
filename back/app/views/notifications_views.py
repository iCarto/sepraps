from django.db import connection
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.util import dictfetchall
from users.constants import GROUP_EDICION, GROUP_GESTION


def create_notification(type, title, message, severity, url):
    return {
        "id": type + "-" + title,
        "type": type,
        "title": title,
        "message": message,
        "severity": severity,
        "url": url,
    }


def get_provider_missing_contacts_notifications(filters, user):
    with connection.cursor() as cursor:
        query = """
            SELECT DISTINCT prov.name AS provider_name, p.id AS project_id
            FROM provider prov
                LEFT JOIN provider_contact pc ON pc.entity_id = prov.id
                JOIN project p ON p.provider_id = prov.id
                LEFT JOIN contract_project cp on cp.project_id = p.id
                LEFT JOIN construction_contract_contact ccc ON ccc.entity_id = cp.contract_id
                LEFT JOIN contact ct ON ct.id = ccc.contact_id
            WHERE pc.contact_id IS NULL
            {filter_conditions}

            """
        filter_conditions = []
        filter_conditions_params = []
        if filter := filters.get("projects"):
            filter_conditions.append("and p.id = ANY(%s)")
            filter_conditions_params.append(filter)
        if filter := filters.get("construction_contracts"):
            filter_conditions.append("and cp.contract_id = ANY(%s)")
            filter_conditions_params.append(filter)
        if user.belongs_to([GROUP_EDICION, GROUP_GESTION]):
            filter_conditions.append(
                "AND (p.creation_user_id = {user_id} OR ct.user_id = {user_id})".format(
                    user_id=user.id
                )
            )

        cursor.execute(
            query.format(filter_conditions=" ".join(filter_conditions)),
            filter_conditions_params,
        )

        data = dictfetchall(cursor)
        notifications = []
        for row in data:
            notifications.append(
                create_notification(
                    "provider_missing_contacts",
                    row["provider_name"],
                    "Este prestador no tiene contactos",
                    "warning",
                    "projects/{}/location".format(row["project_id"]),
                )
            )
        return notifications


def get_no_updates_in_project_notifications(filters, user):
    with connection.cursor() as cursor:
        query = """
            SELECT DISTINCT p.id AS project_id, p.code, STRING_AGG (l."name", ' - ') project_name
            FROM project p
                LEFT JOIN project_linked_localities pll on pll.project_id = p.id
                LEFT JOIN locality l on l.code = pll.locality_id
                LEFT JOIN contract_project cp on cp.project_id = p.id
                LEFT JOIN construction_contract_contact ccc ON ccc.entity_id = cp.contract_id
                LEFT JOIN contact ct ON ct.id = ccc.contact_id
            WHERE p.updated_at <= date_trunc('day', NOW() - interval '3 month')
            {filter_conditions}
            GROUP BY p.id, p.code
            """
        filter_conditions = []
        filter_conditions_params = []
        if filter := filters.get("projects"):
            filter_conditions.append("and p.id = ANY(%s)")
            filter_conditions_params.append(filter)
        if filter := filters.get("construction_contracts"):
            filter_conditions.append("and cp.contract_id = ANY(%s)")
            filter_conditions_params.append(filter)
        if user.belongs_to([GROUP_EDICION, GROUP_GESTION]):
            filter_conditions.append(
                "AND (p.creation_user_id = {user_id} OR ct.user_id = {user_id})".format(
                    user_id=user.id
                )
            )

        cursor.execute(
            query.format(filter_conditions=" ".join(filter_conditions)),
            filter_conditions_params,
        )

        data = dictfetchall(cursor)
        notifications = []
        for row in data:
            notifications.append(
                create_notification(
                    "no_updates_in_project",
                    "Proyecto {} - {}".format(row["code"], row["project_name"]),
                    "Hace más de 3 meses que no se actualiza este proyecto",
                    "warning",
                    "projects/{}/summary".format(row["project_id"]),
                )
            )
        return notifications


def get_incomplete_monthly_certification_notifications(filters, user):
    if filters.get("projects"):
        return []

    with connection.cursor() as cursor:
        query = """
            SELECT DISTINCT pqi.project_id as project_id, mqi.questionnaire_id, p.code, to_char(make_date(mqi."year", mqi."month", 1), 'MM/YYYY') as year_month
            FROM monthly_questionnaire_instance mqi
                JOIN monthly_questionnaire_value mqv ON mqv.questionnaire_instance_id = mqi.id
                JOIN project_questionnaire_instance pqi ON pqi.questionnaire_instance_id = mqi.id
                JOIN project p ON p.id = pqi.project_id
                JOIN contract_project cp on cp.project_id = p.id
                JOIN construction_contract cc ON cc.id = cp.contract_id
                LEFT JOIN construction_contract_contact ccc ON ccc.entity_id = cc.id
                LEFT JOIN contact ct ON ct.id = ccc.contact_id
            WHERE (to_char(make_date(mqi."year", mqi."month", 1), 'YYYY-MM') < to_char(CURRENT_DATE - INTERVAL '1 month', 'YYYY-MM')
                OR (to_char(make_date(mqi."year", mqi."month", 1), 'YYYY-MM') = to_char(CURRENT_DATE - INTERVAL '1 month', 'YYYY-MM') AND EXTRACT('day' FROM CURRENT_DATE) > 10))
                AND mqv.value IS NULL
	            AND mqi.questionnaire_id = 'certificacion_mensual'
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
        notifications = []
        for row in data:
            notifications.append(
                create_notification(
                    "incomplete_monthly_certification",
                    "Proyecto {} - Mes {}".format(row["code"], row["year_month"]),
                    "No se han introducido datos en la certificación presupuestaria de"
                    " este mes",
                    "error",
                    "projects/{}/questionnaires/certificacion_mensual".format(
                        row["project_id"]
                    ),
                )
            )
        return notifications


def get_contracts_milestone_compliance_notifications(
    milestone_code, notification_code, notification_message, filters, user
):
    if filters.get("projects"):
        return []
    with connection.cursor() as cursor:
        query = """
            WITH cc_projects AS(
                SELECT cc.id, count(*) AS projects_number
                FROM construction_contract cc
                    JOIN contract_project cp on cp.contract_id = cc.id
                GROUP BY cc.id
            ), cc_projects_milestones AS (
                SELECT cc.id, count(*) AS projects_number_milestone_completed
                FROM construction_contract cc
                    JOIN contract_project cp on cp.contract_id = cc.id
                    JOIN milestone m ON m.project_id = cp.project_id
                WHERE
                    m.code = '{milestone_code}' AND m.compliance_date IS NOT NULL
                GROUP BY cc.id
            )
            SELECT DISTINCT cc.id as contract_id, cc.number as contract_number
            FROM cc_projects ccp
                JOIN cc_projects_milestones ccpm ON ccpm.id = ccp.id
                JOIN construction_contract cc ON cc.id = ccp.id
                LEFT JOIN construction_contract_contact ccc ON ccc.entity_id = cc.id
                LEFT JOIN contact ct ON ct.id = ccc.contact_id
            WHERE ccp.projects_number = ccpm.projects_number_milestone_completed
                AND cc.execution_certificate_start_date IS NULL
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
            query.format(
                milestone_code=milestone_code,
                filter_conditions=" ".join(filter_conditions),
            ),
            filter_conditions_params,
        )

        data = dictfetchall(cursor)
        notifications = []
        for row in data:
            notifications.append(
                create_notification(
                    notification_code,
                    "Contrato {}".format(row["contract_number"]),
                    notification_message,
                    "error",
                    "contracts/{}/phases".format(row["contract_id"]),
                )
            )
        return notifications


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notifications(request, format=None):
    filter = {}

    if filter_param := request.GET.get("project"):
        filter["projects"] = [int(filter_param)]
    if filter_param := request.GET.get("construction_contract"):
        filter["construction_contracts"] = [int(filter_param)]

    return Response(
        get_contracts_milestone_compliance_notifications(
            "start_of_works",
            "all_work_sites_delivered",
            "Este contrato no tiene fecha de inicio - Todos los sitios de obra se han"
            " entregado",
            filter,
            request.user,
        )
        + get_contracts_milestone_compliance_notifications(
            "final_reception",
            "all_projects_completed",
            "Este contrato no tiene fecha de recepción definitiva - Se han recibido"
            " todos los proyectos",
            filter,
            request.user,
        )
        + get_incomplete_monthly_certification_notifications(filter, request.user)
        + get_no_updates_in_project_notifications(filter, request.user)
        + get_provider_missing_contacts_notifications(filter, request.user)
    )
