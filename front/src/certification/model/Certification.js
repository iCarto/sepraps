import {comments_api_adapter, createComments} from "comment/model";
import {createPayment, payment_api_adapter} from "payment/model";
import {createProjectSummary, project_summary_api_adapter} from "project/model";

class Certifications extends Array {}

const certification_api_adapter = certification => {
    if (certification["project"] && typeof certification["project"] === "object") {
        certification["project"] = createProjectSummary(
            project_summary_api_adapter({...certification["project"]})
        );
    }
    if (certification["payment"]) {
        certification["payment"] = createPayment(
            payment_api_adapter({...certification["payment"]})
        );
    }
    if (certification["certification_comments"]) {
        certification["certification_comments"] = createComments(
            comments_api_adapter(certification["certification_comments"])
        );
    }

    return certification;
};

const certification_view_adapter = certification => {
    delete certification["folder"];
    delete certification["created_by"];
    delete certification["created_at"];
    delete certification["updated_at"];
    delete certification["updated_by"];

    delete certification["comments"];

    return certification;
};

const certifications_api_adapter = certifications => {
    return certifications.map(certification_api_adapter);
};

const createCertifications = (data = []) => {
    const certifications = Certifications.from(data, certification =>
        createCertification(certification)
    );
    return certifications;
};

const createCertification = ({
    id = null,
    expected_amount = null,
    approved_amount = null,
    notes = "",
    comments = [],
    payment = null,
    project = null,
    folder = "",
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
} = {}) => {
    const publicApi = {
        id,
        expected_amount,
        approved_amount,
        notes,
        comments,
        payment,
        project,
        folder,
        created_by,
        created_at,
        updated_at,
        updated_by,
    };

    return Object.freeze(publicApi);
};

export {
    createCertification as default,
    createCertifications,
    certification_api_adapter,
    certifications_api_adapter,
    certification_view_adapter,
};
