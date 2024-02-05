class ContractServices extends Array {}

const contract_service_api_adapter = contractService => {
    return contractService;
};

const contract_services_api_adapter = contractServices =>
    contractServices.map(contract_service_api_adapter);

const contract_service_view_adapter = contractService => {
    return contractService;
};

const createContractServices = (data = []) => {
    const contract_services = ContractServices.from(data, contract_service =>
        createContractService(contract_service)
    );
    return contract_services;
};

const createContractService = ({
    id = null,
    code = null,
    name = null,
    labels = null,
    properties = [],
} = {}) => {
    const publicApi = {
        id,
        code,
        name,
        labels,
        properties,
    };

    return Object.freeze(publicApi);
};

export {
    createContractService as default,
    createContractServices,
    contract_service_api_adapter,
    contract_services_api_adapter,
    contract_service_view_adapter,
};
