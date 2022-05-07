class FinancingFunds extends Array {}

const financing_fund_api_adapter = financing_fund => {
    return financing_fund;
};

const financing_funds_api_adapter = financing_funds =>
    financing_funds.map(financing_fund_api_adapter);

const createFinancingFunds = (data = []) => {
    const financing_funds = FinancingFunds.from(data, financing_fund =>
        createFinancingFund(financing_fund)
    );
    return financing_funds;
};

const createFinancingFund = ({id = null, short_name = "", name = ""} = {}) => {
    const publicApi = {
        id,
        short_name,
        name,
    };

    return Object.freeze(publicApi);
};

export {
    createFinancingFund as default,
    createFinancingFunds,
    financing_fund_api_adapter,
    financing_funds_api_adapter,
};
