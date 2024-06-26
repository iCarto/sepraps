import {FormUtil} from "base/form/utilities";
import {DYNAMIC_TYPES} from ".";
import {
    FormDatePicker,
    FormInputDecimal,
    FormInputInteger,
    FormInputText,
    FormTextArea,
} from "base/form/components";
import {DynamicFormSelect} from "../components";

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
        if (attributeSchema.type === DYNAMIC_TYPES.TEXT_AREA) {
            return (
                <FormTextArea
                    key={attributeName}
                    name={attributeName}
                    label={attributeSchema.label}
                    maxLength={500}
                    rows={2}
                />
            );
        }
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
                    endAdornment={attributeSchema.unit}
                />
            );
        }
        if (attributeSchema.type === DYNAMIC_TYPES.DECIMAL) {
            return (
                <FormInputDecimal
                    key={attributeName}
                    name={attributeName}
                    label={attributeSchema.label}
                    endAdornment={attributeSchema.unit}
                />
            );
        }
        if (attributeSchema.type === DYNAMIC_TYPES.DOMAIN) {
            // Remember to include <DomainProvider> in some place of parents components tree
            return (
                <DynamicFormSelect
                    key={attributeName}
                    name={attributeName}
                    label={attributeSchema.label}
                    fieldDomain={attributeSchema.domain}
                />
            );
        }
        return (
            <FormInputText
                key={attributeName}
                name={attributeName}
                label={attributeSchema.label}
                endAdornment={attributeSchema.unit}
            />
        );
    },
};

export default DynamicFormUtil;
