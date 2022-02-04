class Contracts extends Array {}

const contract_api_adapter = contract => {
    contract["bid_request_date"] = new Date(contract["bid_request_date"]);
    contract["awarding_date"] = new Date(contract["awarding_date"]);
    contract["execution_signature_date"] = new Date(
        contract["execution_signature_date"]
    );
    contract["execution_order_start_date"] = new Date(
        contract["execution_order_start_date"]
    );
    contract["execution_certificate_start_date"] = new Date(
        contract["execution_certificate_start_date"]
    );
    contract["execution_expected_delivery_date"] = new Date(
        contract["execution_expected_delivery_date"]
    );
    contract["execution_final_delivery_date"] = new Date(
        contract["execution_final_delivery_date"]
    );
    contract["created_at"] = new Date(contract["created_at"]);
    contract["updated_at"] = new Date(contract["updated_at"]);
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
    execution_signature_date = null,
    execution_order_start_date = null,
    execution_certificate_start_date = null,
    execution_expected_delivery_date = null,
    execution_final_delivery_date = null,
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
        execution_signature_date,
        execution_order_start_date,
        execution_certificate_start_date,
        execution_expected_delivery_date,
        execution_final_delivery_date,
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
};
