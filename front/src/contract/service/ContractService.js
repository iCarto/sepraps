import {
    createContracts,
    createContract,
    contracts_api_adapter,
    contract_api_adapter,
} from "contract/model";
import {createEntityService} from "base/entity/service";

export const TEMPLATE = {
    SHORT: "short",
};

const basePath = "/api/app/constructioncontracts";

const entityService = createEntityService(
    basePath,
    createContract,
    createContracts,
    contract_api_adapter,
    contracts_api_adapter
);

const ContractService = {
    getList(filter, sort, order, format = null) {
        return entityService.getList(filter, null, sort, order, format);
    },

    getPaginatedList(filter, page, sort, order) {
        return entityService.getList(filter, page, sort, order);
    },

    getFeatures(filter) {
        return entityService.getFeatures(filter);
    },

    getBySearchText(searchText) {
        return entityService.getBySearchText(searchText);
    },

    get(id) {
        return entityService.get(id);
    },

    create(provider) {
        return entityService.create(provider);
    },

    update(provider) {
        return entityService.update(provider);
    },
};

export default ContractService;
