import {
    createContracts,
    createContract,
    contracts_api_adapter,
    contract_api_adapter,
    contract_view_adapter,
} from "model";
import AuthApiService from "./AuthApiService";

export const TEMPLATE = {
    SHORT: "short",
};

const basePath = "/api/monitoring/constructioncontracts";

const ContractService = {
    getContracts(showClosed = false, template = null) {
        const path =
            basePath +
            (showClosed ? "?status=all" : "?status=active") +
            (template ? `&template=${template}` : "");
        console.log({showClosed}, {path});
        return AuthApiService.get(path).then(response => {
            return createContracts(contracts_api_adapter(response));
        });
    },

    getContract(id) {
        return AuthApiService.get(basePath + "/" + id).then(response => {
            return createContract(contract_api_adapter(response));
        });
    },

    createContract(contract) {
        return AuthApiService.post(
            basePath,
            createContract(contract_view_adapter({...contract}))
        ).then(response => {
            return createContract(contract_api_adapter(response));
        });
    },

    updateContract(contract) {
        return AuthApiService.put(
            basePath + "/" + contract.id,
            createContract(contract_view_adapter({...contract}))
        ).then(response => {
            return createContract(contract_api_adapter(response));
        });
    },
};

export default ContractService;