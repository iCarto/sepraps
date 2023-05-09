import {
    createContracts,
    createContract,
    contracts_api_adapter,
    contract_api_adapter,
} from "contract/model";
import {AuthApiService} from "base/api/service";
import {ServiceUtil} from "base/api/utilities";

export const TEMPLATE = {
    SHORT: "short",
};

const basePath = "/api/monitoring/constructioncontracts";

const ContractService = {
    getAll(filter, page, sort, order) {
        return AuthApiService.get(
            `${basePath}?page=${page}&${ServiceUtil.getFilterQueryString(
                filter
            )}&${ServiceUtil.getOrderQueryString(sort, order)}`
        ).then(response => {
            response.results = createContracts(contracts_api_adapter(response.results));
            return response;
        });
    },

    getBySearchText(searchText) {
        return AuthApiService.get(basePath + `?search=${searchText}`).then(response => {
            return createContracts(contracts_api_adapter(response));
        });
    },

    get(id) {
        return AuthApiService.get(basePath + "/" + id).then(response => {
            return createContract(contract_api_adapter(response));
        });
    },

    create(contract) {
        return AuthApiService.post(basePath, contract).then(response => {
            return createContract(contract_api_adapter(response));
        });
    },

    update(contract) {
        return AuthApiService.put(basePath + "/" + contract.id, contract).then(
            response => {
                return createContract(contract_api_adapter(response));
            }
        );
    },
};

export default ContractService;
