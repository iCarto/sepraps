class Contracts extends Array {}

const contract_api_adapter = contract => {
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
    id_request_id = "",
    bid_request_date = null,
    bid_request_budget = null,
    awarding_budget = null,
    awarding_date = null,
    execution_signature_date = null,
    created_at = null,
    updated_at = null,
} = {}) => {
    const publicApi = {
        id,
        number,
        comments,
        bid_request_number,
        id_request_id,
        bid_request_date,
        bid_request_budget,
        awarding_budget,
        awarding_date,
        execution_signature_date,
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
