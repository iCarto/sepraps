import {NumberUtil} from "utilities";

export function useFormattedValue() {
    let formatValue = (value, datatype = null) => {
        if (datatype === "decimal2") {
            return NumberUtil.formatDecimal(value);
        }
        if (datatype === "integer") {
            return NumberUtil.formatInteger(value);
        }
        return value;
    };

    return formatValue;
}
