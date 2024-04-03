import {
    createProvider,
    createProviders,
    provider_api_adapter,
    providers_api_adapter,
} from "provider/model";
import {createEntityService} from "base/entity/service";
import {AuthApiService} from "base/api/service";
import {createProjectsSummaries, projects_summaries_api_adapter} from "project/model";

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
        return entityService.getList(filter, null, sort, order, null, format);
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

    create(entity) {
        return entityService.create(entity);
    },

    update(entity) {
        return entityService.update(entity);
    },

    delete(id) {
        return entityService.delete(id);
    },

    getProjectsList(id) {
        return AuthApiService.get(`${basePath}/${id}/projects`).then(response => {
            return createProjectsSummaries(projects_summaries_api_adapter(response));
        });
    },
};

export default ProviderService;
