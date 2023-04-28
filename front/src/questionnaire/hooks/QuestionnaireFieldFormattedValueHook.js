import {NumberUtil} from "base/format/utilities";

export function useFormattedValue() {
    let formatValue = (value, datatype = null) => {
        if (datatype === "decimal2") {
            return NumberUtil.formatDecimal2(value);
        }
        if (datatype === "integer") {
            return NumberUtil.formatInteger(value);
        }
        return value;
    };

    return formatValue;
}
