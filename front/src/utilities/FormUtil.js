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
};

export default FormUtil;
