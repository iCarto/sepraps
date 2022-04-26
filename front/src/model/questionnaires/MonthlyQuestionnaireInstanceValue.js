class MQInstanceValues extends Array {}

const mq_instance_value_api_adapter = mq_instance_value => {
    return mq_instance_value;
};

const mq_instance_values_api_adapter = mq_instance_values =>
    mq_instance_values.map(mq_instance_value_api_adapter);

const mq_instance_value_view_adapter = mq_instance_value => {
    return mq_instance_value;
};

const createMQInstanceValues = (data = []) => {
    const mq_instance_values = MQInstanceValues.from(data, mq_instance_value =>
        createMQInstanceValue(mq_instance_value)
    );
    return mq_instance_values;
};

const createMQInstanceValue = ({
    id = null,
    code = "",
    datatype = "",
    label = "",
    expected_value = "",
    value = "",
} = {}) => {
    const publicApi = {
        id,
        code,
        datatype,
        label,
        expected_value,
        value,
    };

    return Object.freeze(publicApi);
};

export {
    createMQInstanceValue as default,
    createMQInstanceValues,
    mq_instance_value_api_adapter,
    mq_instance_values_api_adapter,
    mq_instance_value_view_adapter,
};
