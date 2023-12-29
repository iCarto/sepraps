import {
    createAmendment,
    createAmendments,
    amendment_api_adapter,
    amendments_api_adapter,
} from "amendment/model";
import {createEntityService} from "base/entity/service";

const basePath = "/api/app/amendments";

const entityService = createEntityService(
    basePath,
    createAmendment,
    createAmendments,
    amendment_api_adapter,
    amendments_api_adapter
);

const AmendmentService = {
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

export default AmendmentService;
