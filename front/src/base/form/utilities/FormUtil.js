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

    getFormValue(value, defaultValue = null) {
        // for boolean fields, false (not falsy) values need to be returned as such, and not as an empty string
        if (value === false) {
            defaultValue = false;
        }
        if (defaultValue == null) {
            // If not defaultValue is present form expects an empty string
            defaultValue = "";
        }
        // in front-end falsy values doesn't include 0
        // For si/non fields, 0 should not evaluate as falsy, since it is the value for the "Non" option.
        return value || value === 0 ? value : defaultValue;
    },

    getDataValue(value, defaultValue = null) {
        // in front-end falsy values doesn't include 0
        // For si/non fields, 0 should not evaluate as falsy, since it is the value for the "Non" option.
        return value || value === 0 ? value : defaultValue;
    },
};

export default FormUtil;
