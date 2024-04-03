import {
    createFieldReport,
    createFieldReports,
    fieldReport_api_adapter,
    fieldReports_api_adapter,
} from "fieldReport/model";
import {createEntityService} from "base/entity/service";
import {AuthApiService} from "base/api/service";

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
        return entityService.getList(filter, null, sort, order, null, format);
    },

    getPaginatedList(filter, page, sort, order) {
        if (filter.creator_user === "undefined" || filter.creator_user == null) {
            filter["creator_user"] = true;
        }
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

    getFieldReportForProject(projectId, fieldReportId) {
        return AuthApiService.get(
            `${basePath}/${fieldReportId}/project/${projectId}`
        ).then(response => {
            return createFieldReport(fieldReport_api_adapter(response));
        });
    },
};

export default FieldReportService;
