import {
    contract_services_api_adapter,
    createContractServices,
    createContractService,
    contract_service_api_adapter,
} from "contract/model";
import {AuthApiService} from "base/api/service";

const contractBasePath = "/api/app/constructioncontracts";
const basePath = "/api/app/contractservices";

const ContractServiceService = {
    getServices(contractId) {
        return AuthApiService.get(`${contractBasePath}/${contractId}/services`).then(
            response => createContractServices(contract_services_api_adapter(response))
        );
    },

    update(contractService) {
        return AuthApiService.put(
            `${basePath}/${contractService.id}`,
            contractService
        ).then(response =>
            createContractService(contract_service_api_adapter(response))
        );
    },
};

export default ContractServiceService;
