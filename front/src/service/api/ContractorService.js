import {
    createContractor,
    createContractors,
    contractors_api_adapter,
    contractor_api_adapter,
} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/contractors";

const ContractorService = {
    getContractors() {
        return AuthApiService.get(basePath).then(response => {
            return createContractors(contractors_api_adapter(response));
        });
    },

    getContractorsBySearchText(searchText) {
        return AuthApiService.get(basePath + `?search=${searchText}`).then(response => {
            return createContractors(contractors_api_adapter(response));
        });
    },

    createContractor(contractor) {
        return AuthApiService.post(basePath, contractor).then(response => {
            return createContractor(contractor_api_adapter(response));
        });
    },

    updateContractor(contractor) {
        return AuthApiService.put(basePath + "/" + contractor.id, contractor).then(
            response => {
                return createContractor(contractor_api_adapter(response));
            }
        );
    },
};

export default ContractorService;
