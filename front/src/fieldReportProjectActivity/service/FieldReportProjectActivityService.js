import {
    createFieldReportProjectActivity,
    createFieldReportProjectActivities,
    fieldReportProjectActivity_api_adapter,
    fieldReportProjectActivities_api_adapter,
} from "fieldReportProjectActivity/model";
import {createEntityService} from "base/entity/service";

const basePath = "/api/app/fieldreportprojectactivities";

const entityService = createEntityService(
    basePath,
    createFieldReportProjectActivity,
    createFieldReportProjectActivities,
    fieldReportProjectActivity_api_adapter,
    fieldReportProjectActivities_api_adapter
);

const FieldReportProjectActivityService = {
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

export default FieldReportProjectActivityService;
