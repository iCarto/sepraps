import {
    createTraining,
    createTrainings,
    training_api_adapter,
    trainings_api_adapter,
} from "training/model";
import {createEntityService} from "base/entity/service";

const basePath = "/api/app/socialcomponenttrainings";

const entityService = createEntityService(
    basePath,
    createTraining,
    createTrainings,
    training_api_adapter,
    trainings_api_adapter
);

const TrainingService = {
    get(id) {
        return entityService.get(id).then(data => {
            return data;
        });
    },

    update(entity) {
        return entityService.update(entity);
    },

    delete(id) {
        return entityService.delete(id);
    },
};

export default TrainingService;
