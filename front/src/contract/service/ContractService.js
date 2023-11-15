import {
    createContracts,
    createContract,
    contracts_api_adapter,
    contract_api_adapter,
} from "contract/model";
import {createEntityService} from "base/entity/service";
import {AuthApiService} from "base/api/service";
import {createPayments, payments_api_adapter} from "payment/model";
import {createProjects, projects_api_adapter} from "project/model";
import {contractor_api_adapter, createContractor} from "contractor/model";

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

    getProjectsList(id) {
        return AuthApiService.get(`${basePath}/${id}/projects`).then(response => {
            return createProjects(projects_api_adapter(response));
        });
    },

    createContractor(contractId, contractor) {
        return AuthApiService.post(
            `${basePath}/${contractId}/contractor`,
            contractor
        ).then(response => createContractor(contractor_api_adapter(response)));
    },

    getPaymentsList(id) {
        return AuthApiService.get(`${basePath}/${id}/payments`).then(response => {
            return createPayments(payments_api_adapter(response));
        });
    },
};

export default ContractService;
