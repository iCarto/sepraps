class Trainings extends Array {}

const training_api_adapter = fieldReport => {
    return fieldReport;
};

const training_view_adapter = training => {
    delete training["folder"];
    delete training["created_by"];
    delete training["created_at"];
    delete training["updated_at"];
    delete training["updated_by"];

    return training;
};

const trainings_api_adapter = trainings => {
    return trainings.map(training_api_adapter);
};

const createTrainings = (data = []) => {
    const trainings = Trainings.from(data, training => createTraining(training));
    return trainings;
};

const createTraining = ({
    id = null,
    name = "",
    start_date = null,
    end_date = null,
    target_population = [],
    target_population_label = "",
    method = "",
    method_label = "",
    number_of_women = null,
    number_of_men = null,
    number_of_hours = null,
    number_of_digital_materials = null,
    number_of_printed_materials = null,
    social_component_monitoring = null,
    contract = null,
    contractor = null,
    folder = "",
    created_by = "",
    created_at = null,
    updated_at = null,
    updated_by = "",
} = {}) => {
    const publicApi = {
        id,
        name,
        start_date,
        end_date,
        target_population,
        target_population_label,
        method,
        method_label,
        number_of_women,
        number_of_men,
        number_of_hours,
        number_of_digital_materials,
        number_of_printed_materials,
        social_component_monitoring,
        contract,
        contractor,
        folder,
        created_by,
        created_at,
        updated_at,
        updated_by,
    };

    return Object.freeze(publicApi);
};

export {
    createTraining as default,
    createTrainings,
    training_api_adapter,
    trainings_api_adapter,
    training_view_adapter,
};
