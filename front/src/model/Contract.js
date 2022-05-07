import {
    createContractor,
    contractor_api_adapter,
    createProjectSummary,
    project_summary_api_adapter,
    createFinancingProgram,
    financing_program_api_adapter,
} from "model";
import {DateUtil, DATE_FORMATS, NumberUtil} from "utilities";
import {contractor_view_adapter} from "./Contractor";

class Contracts extends Array {}

const contract_api_adapter = contract => {
    // in back-end falsy values are null
    contract["bid_request_date"] = contract["bid_request_date"]
        ? new Date(contract["bid_request_date"])
        : null;
    contract["awarding_date"] = contract["awarding_date"]
        ? new Date(contract["awarding_date"])
        : null;
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
    contract["execution_signature_date"] = contract["execution_signature_date"]
        ? new Date(contract["execution_signature_date"])
        : null;
    contract["execution_order_start_date"] = contract["execution_order_start_date"]
        ? new Date(contract["execution_order_start_date"])
        : null;
    contract["execution_certificate_start_date"] = contract[
        "execution_certificate_start_date"
    ]
        ? new Date(contract["execution_certificate_start_date"])
        : null;
    contract["execution_expected_delivery_date"] = contract[
        "execution_expected_delivery_date"
    ]
        ? new Date(contract["execution_expected_delivery_date"])
        : null;
    contract["execution_final_delivery_date"] = contract[
        "execution_final_delivery_date"
    ]
        ? new Date(contract["execution_final_delivery_date"])
        : null;
    if (contract.projects) {
        contract["projects"] = contract.projects.map(project => {
            return createProjectSummary(project_summary_api_adapter(project));
        });
    }

    contract["created_at"] = new Date(contract["created_at"]);
    contract["updated_at"] = new Date(contract["updated_at"]);
    return contract;
};

const contract_view_adapter = contract => {
    // in front-end falsy values are "" or undefined or null
    contract["bid_request_budget"] = !!contract["bid_request_budget"]
        ? NumberUtil.parseFloatOrNull(contract["bid_request_budget"])
        : null;
    contract["bid_request_deadline"] = !!contract["bid_request_deadline"]
        ? NumberUtil.parseIntOrNull(contract["bid_request_deadline"])
        : null;
    contract["awarding_budget"] = !!contract["awarding_budget"]
        ? NumberUtil.parseFloatOrNull(contract["awarding_budget"])
        : null;
    contract["bid_request_date"] = !!contract["bid_request_date"]
        ? DateUtil.formatDate(
              contract["bid_request_date"],
              DATE_FORMATS.SERVER_DATEFORMAT
          )
        : null;
    contract["awarding_date"] = !!contract["awarding_date"]
        ? DateUtil.formatDate(contract["awarding_date"], DATE_FORMATS.SERVER_DATEFORMAT)
        : null;
    contract["execution_signature_date"] = !!contract["execution_signature_date"]
        ? DateUtil.formatDate(
              contract["execution_signature_date"],
              DATE_FORMATS.SERVER_DATEFORMAT
          )
        : null;

    // we must destructure object before its adapation because
    // nested objects are still inmutable inside contract object
    if (!!contract["contractor"]) {
        contract["contractor"] = contractor_view_adapter({...contract["contractor"]});
        // contractor contract and contacts fields are not necessary when processing a contract
        delete contract["contractor"]["contract"];
        delete contract["contractor"]["contacts"];
    } else {
        contract["contractor"] = null;
    }

    contract["financing_program"] = !!contract["financing_program"]
        ? contract["financing_program"].id
        : null;

    contract["execution_order_start_date"] = !!contract["execution_order_start_date"]
        ? DateUtil.formatDate(
              contract["execution_order_start_date"],
              DATE_FORMATS.SERVER_DATEFORMAT
          )
        : null;
    contract["execution_certificate_start_date"] = !!contract[
        "execution_certificate_start_date"
    ]
        ? DateUtil.formatDate(
              contract["execution_certificate_start_date"],
              DATE_FORMATS.SERVER_DATEFORMAT
          )
        : null;
    contract["execution_expected_delivery_date"] = !!contract[
        "execution_expected_delivery_date"
    ]
        ? DateUtil.formatDate(
              contract["execution_expected_delivery_date"],
              DATE_FORMATS.SERVER_DATEFORMAT
          )
        : null;
    contract["execution_final_delivery_date"] = !!contract[
        "execution_final_delivery_date"
    ]
        ? DateUtil.formatDate(
              contract["execution_final_delivery_date"],
              DATE_FORMATS.SERVER_DATEFORMAT
          )
        : null;
    contract["projects"] = contract["projects"].map(project => {
        return project.id;
    });
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
    bid_request_number = "",
    bid_request_id = "",
    bid_request_date = null,
    bid_request_budget = null,
    bid_request_deadline = null,
    awarding_budget = null,
    awarding_percentage_drop = null,
    awarding_date = null,
    financing_program = null,
    contractor = null,
    field_manager = null,
    construction_inspector = null,
    construction_supervisor = null,
    social_coordinator = null,
    social_inspector = null,
    social_supervisor = null,
    execution_signature_date = null,
    execution_order_start_date = null,
    execution_certificate_start_date = null,
    execution_expected_delivery_date = null,
    execution_final_delivery_date = null,
    projects = [],
    created_at = null,
    updated_at = null,
} = {}) => {
    const publicApi = {
        id,
        number,
        comments,
        bid_request_number,
        bid_request_id,
        bid_request_date,
        bid_request_budget,
        bid_request_deadline,
        awarding_budget,
        awarding_percentage_drop,
        awarding_date,
        financing_program,
        contractor,
        field_manager,
        construction_inspector,
        construction_supervisor,
        social_coordinator,
        social_inspector,
        social_supervisor,
        execution_signature_date,
        execution_order_start_date,
        execution_certificate_start_date,
        execution_expected_delivery_date,
        execution_final_delivery_date,
        projects,
        created_at,
        updated_at,
    };

    return Object.freeze(publicApi);
};

export {
    createContract as default,
    createContracts,
    contract_api_adapter,
    contracts_api_adapter,
    contract_view_adapter,
};
