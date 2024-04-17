from django.db import connection
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from app.util import dictfetchall


def create_notification(type, title, message, severity, url, context=None):
    if context is None:
        context = {"section": "all"}
    return {
        "id": type + "-" + title,
        "type": type,
        "title": title,
        "message": message,
        "severity": severity,
        "url": url,
        "context": context,
    }


def format_entity_name(cell, entity_name):
    return cell if entity_name.lower() in cell.lower() else f"{entity_name} {cell}"


def get_provider_missing_contacts_notifications(filter_params, user):
    with connection.cursor() as cursor:
        query = """
            SELECT DISTINCT prov.name AS provider_name, p.id AS project_id
            FROM provider prov
                LEFT JOIN provider_contact pc ON pc.entity_id = prov.id
                JOIN project p ON p.provider_id = prov.id
                LEFT JOIN contract_project cp on cp.project_id = p.id
            WHERE pc.contact_id IS NULL
            {filter_conditions}

            """
        filter_conditions = []

        if filter_param := filter_params.get("project"):
            filter_conditions.append(f"AND p.id = {filter_param}")

        cursor.execute(
            query.format(filter_conditions=" ".join(filter_conditions)), filter_params
        )

        data = dictfetchall(cursor)
        section = "provider"

        return [
            create_notification(
                "provider_missing_contacts",
                row["provider_name"],
                "Este prestador no tiene contactos",
                "warning",
                f"/projects/list/{row['project_id']}/{section}",
                {"section": section},
            )
            for row in data
        ]


def get_no_updates_in_project_notifications(filter_params, user):
    with connection.cursor() as cursor:
        query = """
            SELECT p.id AS project_id, p.code,
                (SELECT STRING_AGG(l."name", ' - ')
                    FROM project_linked_localities pll
                    LEFT JOIN locality l ON l.code = pll.locality_id
                    WHERE pll.project_id = p.id
                ) AS project_name
            FROM project p
                LEFT JOIN contract_project cp on cp.project_id = p.id
            WHERE p.updated_at <= date_trunc('day', NOW() - interval '3 month')
            {filter_conditions}
            GROUP BY p.id, p.code
            """
        filter_conditions = []

        if filter_param := filter_params.get("project"):
            filter_conditions.append(f"AND p.id = {filter_param}")

        cursor.execute(
            query.format(filter_conditions=" ".join(filter_conditions)), filter_params
        )

        data = dictfetchall(cursor)

        return [
            create_notification(
                "no_updates_in_project",
                f"Proyecto {row['code']} - {row['project_name']}",
                "Hace más de 3 meses que no se actualiza este proyecto",
                "warning",
                f"/projects/list/{row['project_id']}/summary",
            )
            for row in data
        ]


def get_certifications_inconsistent_with_components_notifications(filter_params, user):
    with connection.cursor() as cursor:
        query = """
            SELECT DISTINCT
                p.id AS project_id,
                p.code AS project_code
            FROM project p
                LEFT JOIN contract_project cp on cp.project_id = p.id
            WHERE
                (
                    SELECT COALESCE(SUM(c.approved_amount), 0)
                    FROM certification c
                    WHERE c.project_id = p.id and c.active = True
                ) != (
                    SELECT COALESCE(SUM(bcm.paid_amount), 0)
                    FROM building_component_monitoring bcm
                    WHERE bcm.project_id = p.id and bcm.active = True
                )
            {filter_conditions}
            """
        filter_conditions = []

        if filter_param := filter_params.get("project"):
            filter_conditions.append(f"AND p.id = {filter_param}")

        cursor.execute(
            query.format(filter_conditions=" ".join(filter_conditions)), filter_params
        )

        data = dictfetchall(cursor)
        section = "certifications"

        return [
            create_notification(
                "certifications_inconsistent_with_components",
                f"Proyecto {row['project_code']}",
                "El monto aprobado en las certificaciones no coincide con el monto total aprobado para los componentes",
                "error",
                f"/projects/list/{row['project_id']}/{section}/overview",
                {"section": section},
            )
            for row in data
        ]


def get_certifications_inconsistent_with_contract_payment_notifications(
    filter_params, user
):
    with connection.cursor() as cursor:
        query = """
                SELECT
                    pay.id AS payment_id,
                    pay.name AS payment_name,
                    pay.paid_total_amount AS payment_paid_total_amount,
                    pay.contract_id,
                    cc.number AS contract_number,
                    COALESCE(SUM(cert.approved_amount), 0) AS projects_total_approved_amount
                FROM payment pay
                JOIN certification cert ON cert.payment_id = pay.id
                JOIN construction_contract cc ON cc.id = pay.contract_id
                GROUP BY pay.id, pay.contract_id, cc.number
                HAVING pay.paid_total_amount != COALESCE(SUM(cert.approved_amount), 0)
                {filter_conditions}
            """
        filter_conditions = []

        if filter_param := filter_params.get("construction_contract"):
            filter_conditions.append(f"AND pay.contract_id = {filter_param}")

        cursor.execute(
            query.format(filter_conditions=" ".join(filter_conditions)), filter_params
        )

        data = dictfetchall(cursor)
        notifications = []

        for row in data:
            contract_name = format_entity_name(row["contract_number"], "Contrato")
            section = "payments"

            notification = create_notification(
                "payment_inconsistent_with_certifications",
                f"{contract_name} - {row['payment_name']}",
                "El monto de este producto no coincide con el total de las certificaciones de los proyectos relacionados",
                "error",
                f"/contracts/list/{row['contract_id']}/payment/list/{row['payment_id']}",
                {"section": section, "payment_id": row["payment_id"]},
            )
            notifications.append(notification)

        return notifications


def get_contracts_milestone_compliance_notifications(
    milestone_code, notification_code, notification_message, filter_params, user
):
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
            WHERE ccp.projects_number = ccpm.projects_number_milestone_completed
                AND cc.execution_start_date IS NULL
                {filter_conditions}
            """
        filter_conditions = []

        if filter_param := filter_params.get("construction_contract"):
            filter_conditions.append(f"AND cc.id = {filter_param}")

        cursor.execute(
            query.format(
                milestone_code=milestone_code,
                filter_conditions=" ".join(filter_conditions),
            ),
            filter_params,
        )

        data = dictfetchall(cursor)
        notifications = []

        for row in data:
            contract_name = format_entity_name(row["contract_number"], "Contrato")
            section = "execution"

            notification = create_notification(
                notification_code,
                contract_name,
                notification_message,
                "error",
                f"/contracts/list/{row['contract_id']}/{section}",
                {"section": section},
            )
            notifications.append(notification)

        return notifications


def get_pending_payment_notifications(filter_params, user):
    with connection.cursor() as cursor:
        query = """
            SELECT DISTINCT
                pay.contract_id,
                cc.number AS contract_number
            FROM payment pay
            JOIN construction_contract cc ON cc.id = pay.contract_id
            WHERE EXISTS (
                SELECT 1
                FROM payment prev_pay
                WHERE prev_pay.contract_id = pay.contract_id
                AND (
                    (prev_pay.approval_date IS NULL AND prev_pay.status = 'pendiente' AND pay.approval_date IS NOT NULL) AND
                    (prev_pay.expected_approval_date IS NOT NULL AND prev_pay.expected_approval_date < pay.approval_date)
                )
            )
            {filter_conditions}
            GROUP BY pay.id, pay.contract_id, cc.number, cc.creation_user_id
        """
        filter_conditions = []

        if filter_param := filter_params.get("construction_contract"):
            filter_conditions.append(f"AND pay.contract_id = {filter_param}")

        cursor.execute(
            query.format(filter_conditions=" ".join(filter_conditions)), filter_params
        )

        data = dictfetchall(cursor)
        notifications = []

        for row in data:
            contract_name = format_entity_name(row["contract_number"], "Contrato")
            section = "payments"

            notification = create_notification(
                "pending_payment",
                contract_name,
                "Este contrato tiene productos sin aprobar",
                "warning",
                f"/contracts/list/{row['contract_id']}/payment/overview",
                {"section": section},
            )
            notifications.append(notification)

        return notifications


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notifications(request, format=None):  # noqa: ARG001
    filter_params = request.GET

    def get_project_notifications(params):
        return (
            get_certifications_inconsistent_with_components_notifications(
                filter_params, request.user
            )
            + get_no_updates_in_project_notifications(params, request.user)
            + get_provider_missing_contacts_notifications(filter_params, request.user)
        )

    def get_contract_notifications(params):
        return (
            get_contracts_milestone_compliance_notifications(
                "start_of_works",
                "all_work_sites_delivered",
                "Este contrato no tiene fecha de inicio - Todos los sitios de obra se han entregado",
                params,
                request.user,
            )
            # TODO(cmartin): the query in this method is not working properly. The condition to be met is always that the execution_start_date for the contract is null. For this notification to work when the milestone_code is 'final_reception', the date to check would be execution_final_delivery_date. However, we cannot use that date in the query, since it is a dynamic field that is not present in the database (as it is only relevant for contracts that include building execution service).
            # + get_contracts_milestone_compliance_notifications(
            #     "final_reception",
            #     "all_projects_completed",
            #     "Este contrato no tiene fecha de recepción definitiva - Se han recibido"
            #     " todos los proyectos",
            #     params,
            #     request.user,
            # )
            + get_certifications_inconsistent_with_contract_payment_notifications(
                params, request.user
            )
            + get_pending_payment_notifications(params, request.user)
        )

    response = [
        *get_contract_notifications(filter_params),
        *get_project_notifications(filter_params),
    ]

    if filter_params.get("project"):
        response = get_project_notifications(filter_params)
    if filter_params.get("construction_contract"):
        response = get_contract_notifications(filter_params)

    return Response(response)
