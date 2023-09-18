class FieldReportProjectActivities extends Array {}

const fieldReportProjectActivity_api_adapter = fieldReportProjectActivity => {
    return fieldReportProjectActivity;
};

const fieldReportProjectActivity_view_adapter = fieldReportProjectActivity => {
    return fieldReportProjectActivity;
};

const fieldReportProjectActivities_api_adapter = fieldReportProjectActivities => {
    return fieldReportProjectActivities.map(fieldReportProjectActivity_api_adapter);
};

const createFieldReportProjectActivities = (data = []) => {
    const fieldReportProjectActivities = FieldReportProjectActivities.from(
        data,
        fieldReportProjectActivity =>
            createFieldReportProjectActivity(fieldReportProjectActivity)
    );
    return fieldReportProjectActivities;
};

const createFieldReportProjectActivity = ({
    id = null,
    title = "",
    date = null,
    notes = "",
    image1 = null,
    image2 = null,
    image3 = null,
    image4 = null,
    images = [],
    folder = "",
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
} = {}) => {
    const publicApi = {
        id,
        title,
        date,
        notes,
        image1,
        image2,
        image3,
        image4,
        images,
        folder,
        created_by,
        created_at,
        updated_at,
        updated_by,
    };

    return Object.freeze(publicApi);
};

export {
    createFieldReportProjectActivity as default,
    createFieldReportProjectActivities,
    fieldReportProjectActivity_api_adapter,
    fieldReportProjectActivities_api_adapter,
    fieldReportProjectActivity_view_adapter,
};
