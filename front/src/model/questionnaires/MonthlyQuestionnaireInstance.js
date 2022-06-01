import {
    mq_instance_values_api_adapter,
    createMQInstanceValues,
} from "./MonthlyQuestionnaireInstanceValue";

class MQInstance extends Array {}

const mq_instance_api_adapter = mq_instance => {
    mq_instance["created_at"] = mq_instance["created_at"]
        ? new Date(mq_instance["created_at"])
        : null;
    if (mq_instance["values"]) {
        mq_instance["values"] = createMQInstanceValues(
            mq_instance_values_api_adapter(mq_instance["values"])
        );
    }
    return mq_instance;
};

const mq_instances_api_adapter = mq_instance =>
    mq_instance.map(mq_instance_api_adapter);

const mq_instance_view_adapter = mq_instance => {
    return mq_instance;
};

const createMQInstances = (data = []) => {
    const mq_instances = MQInstance.from(data, mq_instance =>
        createMQInstance(mq_instance)
    );
    return mq_instances;
};

const createMQInstance = ({
    id = null,
    month = -1,
    year = -1,
    comments = "",
    values = [],
} = {}) => {
    const publicApi = {
        id,
        month,
        year,
        comments,
        values,
    };

    return Object.freeze(publicApi);
};

export {
    createMQInstance as default,
    createMQInstances,
    mq_instance_api_adapter,
    mq_instances_api_adapter,
    mq_instance_view_adapter,
};
