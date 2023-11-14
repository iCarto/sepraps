import {
    FormDatePicker,
    FormInputDecimal,
    FormInputInteger,
    FormInputText,
} from "base/form/components";
import {FormUtil} from "base/form/utilities";
import {DYNAMIC_TYPES} from ".";

const DynamicFormUtil = {
    getFormDefaultValues(attributes) {
        const defaultDynamicProperties = Object.entries(attributes).map(
            ([attributeName, attributeSchema]) => {
                return [attributeName, FormUtil.getFormValue(attributeSchema.value)];
            }
        );

        return Object.fromEntries(defaultDynamicProperties);
    },

    getDataValues(attributes, data) {
        // False/0 are returned as such. Empty strings & undefined are converted to null.
        return Object.fromEntries(
            Object.entries(attributes).map(([attributeName, attributeSchema]) => {
                return [
                    attributeName,
                    {
                        ...attributeSchema,
                        value: data[attributeName],
                    },
                ];
            })
        );
    },

    getFormField(attributeName, attributeSchema) {
        if (attributeSchema.type === DYNAMIC_TYPES.DATE) {
            return (
                <FormDatePicker
                    key={attributeName}
                    name={attributeName}
                    label={attributeSchema.label}
                />
            );
        }
        if (attributeSchema.type === DYNAMIC_TYPES.INTEGER) {
            return (
                <FormInputInteger
                    key={attributeName}
                    name={attributeName}
                    label={attributeSchema.label}
                    endAdornment={attributeSchema.units}
                />
            );
        }
        if (attributeSchema.type === DYNAMIC_TYPES.DECIMAL) {
            return (
                <FormInputDecimal
                    key={attributeName}
                    name={attributeName}
                    label={attributeSchema.label}
                    endAdornment={attributeSchema.units}
                />
            );
        }
        return (
            <FormInputText
                key={attributeName}
                name={attributeName}
                label={attributeSchema.label}
                endAdornment={attributeSchema.units}
            />
        );
    },
};

export default DynamicFormUtil;
