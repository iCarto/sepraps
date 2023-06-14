import {
    createProvider,
    createProviders,
    provider_api_adapter,
    providers_api_adapter,
} from "provider/model";
import {createEntityService} from "base/entity/service";

const basePath = "/api/app/providers";

const entityService = createEntityService(
    basePath,
    createProvider,
    createProviders,
    provider_api_adapter,
    providers_api_adapter
);

const ProviderService = {
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

    delete(providerId) {
        return entityService.delete(providerId);
    },
};

export default ProviderService;
