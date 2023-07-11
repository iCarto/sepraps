import {
    createFieldReportProject,
    createFieldReportProjects,
    fieldReportProject_api_adapter,
    fieldReportProjects_api_adapter,
} from "fieldReportProject/model";
import {createEntityService} from "base/entity/service";

const basePath = "/api/app/fieldreportprojects";

const entityService = createEntityService(
    basePath,
    createFieldReportProject,
    createFieldReportProjects,
    fieldReportProject_api_adapter,
    fieldReportProjects_api_adapter
);

const FieldReportProjectService = {
    getList(filter, sort, order, format = null) {
        return entityService.getList(filter, null, sort, order, format).then(data => {
            return data;
        });
    },

    getPaginatedList(filter, page, sort, order) {
        return entityService.getList(filter, page, sort, order).then(data => {
            return data;
        });
    },

    getFeatures(filter) {
        return entityService.getFeatures(filter);
    },

    getBySearchText(searchText) {
        return entityService.getBySearchText(searchText);
    },

    get(id) {
        return entityService.get(id).then(data => {
            return data;
        });
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
};

export default FieldReportProjectService;
