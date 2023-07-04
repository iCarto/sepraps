import {
    createFieldReport,
    createFieldReports,
    fieldReport_api_adapter,
    fieldReports_api_adapter,
} from "fieldReport/model";
import {createEntityService} from "base/entity/service";

const basePath = "/api/app/fieldreports";

const entityService = createEntityService(
    basePath,
    createFieldReport,
    createFieldReports,
    fieldReport_api_adapter,
    fieldReports_api_adapter
);

const FieldReportService = {
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
        // return entityService.get(id);
        return fetch("/testing_report_data/fieldReportDummyData.json")
            .then(response => response.json())
            .then(data => {
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

export default FieldReportService;
