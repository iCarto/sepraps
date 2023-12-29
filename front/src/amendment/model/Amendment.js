class Amendments extends Array {}

const amendment_api_adapter = amendment => {
    return amendment;
};

const amendment_view_adapter = amendment => {
    delete amendment["cumulative_contract_amended_amount"];
    delete amendment["cumulative_contract_amended_execution_period"];
    delete amendment["cumulative_contract_amended_execution_period_in_months"];
    delete amendment["folder"];
    delete amendment["created_by"];
    delete amendment["created_at"];
    delete amendment["updated_at"];
    delete amendment["updated_by"];

    return amendment;
};

const amendments_api_adapter = amendments => {
    return amendments.map(amendment_api_adapter);
};

const createAmendments = (data = []) => {
    const amendments = Amendments.from(data, amendment => createAmendment(amendment));
    return amendments;
};

const createAmendment = ({
    id = null,
    signature_date = null,
    amendment_type = "",
    amendment_type_label = "",
    extra_amount = null,
    extra_period = null,
    cumulative_contract_amended_amount = null,
    cumulative_contract_amended_execution_period = null,
    contract = null,
    folder = "",
} = {}) => {
    const publicApi = {
        id,
        signature_date,
        amendment_type,
        amendment_type_label,
        extra_amount,
        extra_period,
        cumulative_contract_amended_amount,
        cumulative_contract_amended_execution_period,
        contract,
        folder,
    };

    return Object.freeze(publicApi);
};

export const AMENDMENT_TYPE_AMOUNT = "amount";
export const AMENDMENT_TYPE_EXECUTION_PERIOD = "expected_execution_period";
export const AMENDMENT_TYPE_MIXED = "mixed";

export {
    createAmendment as default,
    createAmendments,
    amendment_api_adapter,
    amendments_api_adapter,
    amendment_view_adapter,
};
