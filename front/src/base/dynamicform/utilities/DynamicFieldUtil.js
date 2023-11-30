import {DateUtil, NumberUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";
import {DYNAMIC_TYPES} from ".";

const DynamicFieldUtil = {
    getSectionField(attributeName, attributeSchema) {
        let value = attributeSchema.value;
        if (attributeSchema.type === DYNAMIC_TYPES.DATE) {
            value = DateUtil.formatDate(value);
        }
        if (attributeSchema.type === DYNAMIC_TYPES.INTEGER) {
            value = NumberUtil.formatInteger(value);
        }
        if (attributeSchema.type === DYNAMIC_TYPES.DECIMAL) {
            value = NumberUtil.formatDecimal(value);
        }
        if (attributeSchema.type === DYNAMIC_TYPES.DOMAIN) {
            return FieldUtil.getSectionDomainField(
                attributeSchema.label,
                value,
                attributeSchema.domain
            );
        }
        return FieldUtil.getSectionField(
            attributeSchema.label,
            value,
            attributeSchema.unit
        );
    },
};

export default DynamicFieldUtil;
