import {
    createCertification,
    createCertifications,
    certification_api_adapter,
    certifications_api_adapter,
} from "certification/model";
import {createEntityService} from "base/entity/service";
import {AuthApiService} from "base/api/service";
import {comment_api_adapter, createComment} from "comment/model";

const basePath = "/api/app/certifications";

const entityService = createEntityService(
    basePath,
    createCertification,
    createCertifications,
    certification_api_adapter,
    certifications_api_adapter
);

const CertificationService = {
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

    createComment(certificationId, comment) {
        return AuthApiService.post(
            `${basePath}/${certificationId}/comments`,
            comment
        ).then(response => {
            return createComment(comment_api_adapter(response));
        });
    },
};

export default CertificationService;
