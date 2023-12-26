import {contacts_api_adapter, createContacts} from "contact/model";
import {createContractor, contractor_api_adapter} from "contractor/model";
import {createQuestionnaires, questionnaires_api_adapter} from "questionnaire/model";
import {createFinancingProgram, financing_program_api_adapter} from "financing/model";
import {DateUtil, NumberUtil} from "base/format/utilities";

class Contracts extends Array {}

const contract_api_adapter = contract => {
    contract["contractor"] = contract["contractor"]
        ? createContractor(
              contractor_api_adapter({
                  ...contract["contractor"],
                  contract: contract["id"],
              })
          )
        : null;
    contract["financing_program"] = contract["financing_program"]
        ? createFinancingProgram(
              financing_program_api_adapter({
                  ...contract["financing_program"],
              })
          )
        : null;
    contract["expected_execution_end_date"] = contract["expected_execution_period"]
        ? DateUtil.getDateAfterDays(
              contract["execution_start_date"],
              contract["expected_execution_period"]
          )
        : null;

    contract["expected_execution_period_in_months"] = contract[
        "expected_execution_period"
    ]
        ? DateUtil.getMonths(
              contract["execution_start_date"],
              contract["expected_execution_end_date"]
          ) + 1
        : null;
    if (contract["questionnaires"]) {
        contract["questionnaires"] = createQuestionnaires(
            questionnaires_api_adapter(contract["questionnaires"])
        );
    }

    if (contract["contacts"]) {
        contract["contacts"] = createContacts(
            contacts_api_adapter(contract["contacts"])
        );
    }

    contract["created_by"] = contract["creation_user"] || null;

    return contract;
};

const contract_view_adapter = contract => {
    // in front-end falsy values are "" or undefined or null
    contract["bid_request_budget"] = !!contract["bid_request_budget"]
        ? contract["bid_request_budget"]
        : null;
    contract["awarding_budget"] = !!contract["awarding_budget"]
        ? contract["awarding_budget"]
        : null;
    contract["bid_request_date"] = !!contract["bid_request_date"]
        ? contract["bid_request_date"]
        : null;
    contract["awarding_date"] = !!contract["awarding_date"]
        ? contract["awarding_date"]
        : null;
    contract["execution_signature_date"] = !!contract["execution_signature_date"]
        ? contract["execution_signature_date"]
        : null;
    contract["expected_execution_period"] = !!contract["expected_execution_period"]
        ? NumberUtil.parseInteger(contract["expected_execution_period"])
        : null;

    contract["warranty_end_date"] = !!contract["warranty_end_date"]
        ? contract["warranty_end_date"]
        : null;

    contract["financing_program"] = !!contract["financing_program"]
        ? contract["financing_program"].id
        : null;

    contract["contractor"] = !!contract["contractor"]
        ? contract["contractor"].id
        : null;

    contract["execution_start_date"] = !!contract["execution_start_date"]
        ? contract["execution_start_date"]
        : null;

    delete contract["related_contracts"];
    delete contract["folder"];
    delete contract["creation_user"];
    delete contract["created_at"];
    delete contract["updated_at"];
    delete contract["updated_by"];

    return contract;
};

const contracts_api_adapter = contracts => contracts.map(contract_api_adapter);

const createContracts = (data = []) => {
    const contracts = Contracts.from(data, contract => createContract(contract));
    return contracts;
};

const createContract = ({
    id = null,
    number = "CO-000002",
    comments = "",
    services = [],
    services_label = "",
    supervision_areas = [],
    related_contracts = [],
    is_supervision_contract = false,
    total_amount_type = null,
    total_amount_type_label = "",
    product_frequency_type = null,
    product_frequency_type_label = "",
    payment_criteria_type = null,
    payment_criteria_type_label = "",
    bid_request_number = null,
    bid_request_id = null,
    bid_request_lot_number = null,
    bid_request_date = null,
    bid_request_budget_min = null,
    bid_request_budget = null,
    awarding_budget_min = null,
    awarding_budget = null,
    awarding_percentage_drop = null,
    awarding_date = null,
    awarding_professional_liability_insurance = null,
    awarding_professional_liability_insurance_label = "",
    awarding_liability_insurance = null,
    awarding_liability_insurance_label = "",
    awarding_accident_insurance = null,
    awarding_accident_insurance_label = "",
    financing_program = null,
    contractor = null,
    contacts = [],
    execution_signature_date = null,
    execution_start_date = null,
    expected_execution_period = null,
    expected_execution_period_in_months = null,
    expected_execution_end_date = null,
    warranty_end_date = null,
    projects = [],
    questionnaires = [],
    created_by = "",
    created_at = null,
    updated_by = "",
    updated_at = null,
} = {}) => {
    const publicApi = {
        id,
        number,
        comments,
        services,
        services_label,
        supervision_areas,
        related_contracts,
        is_supervision_contract,
        total_amount_type,
        total_amount_type_label,
        product_frequency_type,
        product_frequency_type_label,
        payment_criteria_type,
        payment_criteria_type_label,
        bid_request_number,
        bid_request_id,
        bid_request_lot_number,
        bid_request_date,
        bid_request_budget_min,
        bid_request_budget,
        awarding_budget_min,
        awarding_budget,
        awarding_percentage_drop,
        awarding_date,
        awarding_professional_liability_insurance,
        awarding_professional_liability_insurance_label,
        awarding_liability_insurance,
        awarding_liability_insurance_label,
        awarding_accident_insurance,
        awarding_accident_insurance_label,
        financing_program,
        contractor,
        contacts,
        execution_signature_date,
        expected_execution_period,
        expected_execution_period_in_months,
        execution_start_date,
        expected_execution_end_date,
        warranty_end_date,
        projects,
        questionnaires,
        created_by,
        created_at,
        updated_by,
        updated_at,
    };

    return Object.freeze(publicApi);
};

export const MAX_MIN_AMOUNT_TYPE = "maximo_minimo";
export const FIXED_VARIABLE_CRITERIA_TYPE = "fijo_variable";

export const SUPERVISION_AREAS = {
    BUILDING: "building",
    SOCIAL: "social",
    ENVIRONMENTAL: "environmental",
};

export {
    createContract as default,
    createContracts,
    contract_api_adapter,
    contracts_api_adapter,
    contract_view_adapter,
};
