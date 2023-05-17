import {
    createContractor,
    createContractors,
    contractors_api_adapter,
    contractor_api_adapter,
} from "contractor/model";
import {AuthApiService} from "base/api/service";

const basePath = "/api/monitoring/contractors";

const ContractorService = {
    getAll() {
        return AuthApiService.get(basePath).then(response => {
            return createContractors(contractors_api_adapter(response));
        });
    },

    getAllBySearchText(searchText) {
        return AuthApiService.get(basePath + `?search=${searchText}`).then(response => {
            return createContractors(contractors_api_adapter(response));
        });
    },

    create(contractor) {
        return AuthApiService.post(basePath, contractor).then(response => {
            return createContractor(contractor_api_adapter(response));
        });
    },

    update(contractor) {
        return AuthApiService.put(basePath + "/" + contractor.id, contractor).then(
            response => {
                return createContractor(contractor_api_adapter(response));
            }
        );
    },
};

export default ContractorService;
