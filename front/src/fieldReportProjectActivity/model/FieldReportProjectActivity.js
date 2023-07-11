class FieldReportProjectActivities extends Array {}

const fieldReportProjectActivity_api_adapter = fieldReportProjectActivity => {
    fieldReportProjectActivity["images"] = [
        fieldReportProjectActivity.image1,
        fieldReportProjectActivity.image2,
        fieldReportProjectActivity.image3,
        fieldReportProjectActivity.image4,
    ].filter(image => image);
    return fieldReportProjectActivity;
};

const fieldReportProjectActivity_view_adapter = fieldReportProjectActivity => {
    fieldReportProjectActivity.image1 = fieldReportProjectActivity.images[0];
    fieldReportProjectActivity.image2 = fieldReportProjectActivity.images[1];
    fieldReportProjectActivity.image3 = fieldReportProjectActivity.images[2];
    fieldReportProjectActivity.image4 = fieldReportProjectActivity.images[3];

    delete fieldReportProjectActivity["images"];

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
    images = [],
} = {}) => {
    const publicApi = {
        id,
        title,
        date,
        notes,
        images,
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
