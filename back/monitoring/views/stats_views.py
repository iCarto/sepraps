from monitoring.models.construction_contract import ConstructionContract
from questionnaires import services as questtionnaire_services
from questionnaires.models.monthly_questionnaire_instance import (
    MonthlyQuestionnaireInstance,
)
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def get_monthly_questionnaire_stats(
    request, questionnaire_code, field_code, format=None
):
    query = """
            SELECT distinct mqi.*
            FROM project_questionnaire_instance pqi
                LEFT JOIN monthly_questionnaire_instance mqi ON mqi.id = pqi.questionnaire_instance_id
                LEFT JOIN project p ON p.id = pqi.project_id
                LEFT JOIN construction_contract cc on cc.id = p.construction_contract_id
                LEFT JOIN financing_program fp on fp.id = cc.financing_program_id
                LEFT JOIN financing_program_financing_funds fpff on fpff.financingprogram_id = fp.id
                LEFT JOIN project_linked_localities pll on pll.project_id = p.id
                LEFT JOIN locality l on l.code = pll.locality_id
                INNER JOIN district di on di.code = l.district_id
                INNER JOIN department de on de.code = l.department_id
            WHERE pqi.questionnaire_id = '{questionnaire_code}'
            {filter_conditions}
            ORDER BY mqi.year, mqi.month
        """

    filter_conditions = []
    if filter := request.GET.get("project"):
        filter_conditions.append("and pqi.project_id = {}".format(filter))
    if filter := request.GET.get("construction_contract"):
        filter_conditions.append("and p.construction_contract_id = {}".format(filter))
    if filter := request.GET.get("district"):
        filter_conditions.append("and l.district_id = '{}'".format(filter))
    if filter := request.GET.get("department"):
        filter_conditions.append("and l.department_id = '{}'".format(filter))
    if filter := request.GET.get("financing_program"):
        filter_conditions.append("and cc.financing_program_id = {}".format(filter))
    if filter := request.GET.get("financing_fund"):
        filter_conditions.append("and fpff.financingfund_id = {}".format(filter))
    if filter := request.GET.get("month_from"):
        filter_conditions.append(
            "and mqi.year >= {} and mqi.month >= {}".format(
                filter.split("/")[0], filter.split("/")[1]
            )
        )
    if filter := request.GET.get("month_to"):
        filter_conditions.append(
            "and mqi.year <= {} and mqi.month <= {}".format(
                filter.split("/")[0], filter.split("/")[1]
            )
        )

    questionnaire_instances = MonthlyQuestionnaireInstance.objects.raw(
        query.format(
            questionnaire_code=questionnaire_code,
            filter_conditions=" ".join(filter_conditions),
        )
    ).prefetch_related("values")

    return Response(
        questtionnaire_services.get_monthly_questionnaire_instances_dataframe(
            questionnaire_code, field_code, questionnaire_instances
        )
    )
