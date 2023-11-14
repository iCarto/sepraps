import {
    createContractSupervisionArea,
    contract_supervision_area_api_adapter,
} from "contract/model";
import {AuthApiService} from "base/api/service";

const contractsBasePath = "/api/app/constructioncontracts";
const basePath = "/api/app/contractsupervisionareas";

const ContractServiceAreaService = {
    getSupervisionArea(id, area) {
        return AuthApiService.get(
            `${contractsBasePath}/${id}/supervisionareas/${area}`
        ).then(response =>
            createContractSupervisionArea(
                contract_supervision_area_api_adapter(response)
            )
        );
    },

    updateSupervisionArea(supervisionArea) {
        return AuthApiService.put(
            `${basePath}/${supervisionArea.id}`,
            supervisionArea
        ).then(response =>
            createContractSupervisionArea(
                contract_supervision_area_api_adapter(response)
            )
        );
    },
};

export default ContractServiceAreaService;
