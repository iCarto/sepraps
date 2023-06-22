/**
 * Form entities has this structure to make easy the error management in components
 * - Entity object
 *     - Entity field
 *         - Entity field value
 *         - Entity field errors
 */

const FormUtil = {
    getFieldError(field, errors) {
        const fieldErrors = errors ? errors.filter(error => error.field === field) : [];
        return fieldErrors.map(error => error.msg).join(<br />);
    },

    getFormData(entity, errors) {
        let formData = {};
        Object.keys(entity).forEach(entityField => {
            formData[entityField] = {};
            formData[entityField].value = entity[entityField];
            formData[entityField].errors = this.getFieldError(entityField, errors);
        });
        return formData;
    },

    getFormValue(value, defaultValue = "") {
        // If no defaultValue is present form expects an empty string.
        // False/0/"" are returned as such for the form.
        return value ?? defaultValue;
    },

    getDataValue(value, defaultValue = null) {
        // False/0 are returned as such. Empty strings & undefined are converted to null.
        if (value === "") return defaultValue;
        return value ?? defaultValue;
    },
};

export default FormUtil;
