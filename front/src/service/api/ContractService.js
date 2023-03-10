import {
    createContracts,
    createContract,
    contracts_api_adapter,
    contract_api_adapter,
} from "model";
import AuthApiService from "./AuthApiService";

export const TEMPLATE = {
    SHORT: "short",
};

const basePath = "/api/monitoring/constructioncontracts";

const getQueryStringByFilter = filter => {
    return Object.keys(filter)
        .filter(key => filter[key])
        .map(key => {
            return key + "=" + filter[key];
        })
        .join("&");
};

const ContractService = {
    getContracts(filter) {
        return AuthApiService.get(`${basePath}?${getQueryStringByFilter(filter)}`).then(
            response => {
                return createContracts(contracts_api_adapter(response));
            }
        );
    },

    getContractsBySearchText(searchText) {
        return AuthApiService.get(basePath + `?search=${searchText}`).then(response => {
            return createContracts(contracts_api_adapter(response));
        });
    },

    getContract(id) {
        return AuthApiService.get(basePath + "/" + id).then(response => {
            return createContract(contract_api_adapter(response));
        });
    },

    createContract(contract) {
        return AuthApiService.post(basePath, contract).then(response => {
            return createContract(contract_api_adapter(response));
        });
    },

    updateContract(contract) {
        return AuthApiService.put(basePath + "/" + contract.id, contract).then(
            response => {
                return createContract(contract_api_adapter(response));
            }
        );
    },
};

export default ContractService;
