import {
    localCurrencyFormatter,
    localIntegerFormatter,
    localDecimalFormatter,
} from "config";

const NumberUtil = {
    formatDecimal(value, decimalSize = 2) {
        if (!value) {
            return "";
        }
        if (isNaN(value)) {
            return value;
        }
        const floatNumber = parseFloat(value);
        return floatNumber.toFixed(decimalSize).replace(".", ",");
    },

    formatDecimal2(value) {
        if (!value) {
            return "";
        }
        value = value.replace(",", ".");
        if (isNaN(value)) {
            return value;
        }
        const floatNumber = parseFloat(value);
        return localDecimalFormatter.format(floatNumber);
    },

    formatInteger(value) {
        if (!value) {
            return "";
        }
        if (isNaN(value)) {
            return value;
        }
        return localIntegerFormatter.format(value);
    },

    formatCurrency(value, showCurrencySymbol = true) {
        if (!value) {
            return "";
        }
        if (isNaN(value)) {
            return value;
        }
        var formatter = showCurrencySymbol
            ? localCurrencyFormatter
            : localIntegerFormatter;
        return formatter.format(value);
    },

    parseFloatOrNull(value) {
        if (value == null) {
            return "";
        }
        if (value === "") {
            return 0;
        }
        //TODO: This function should use i18n pattern to validate decimal numbers
        value = value.replace(",", ".");
        if (isNaN(value)) {
            return value;
        }
        return parseFloat(value);
    },

    parseIntOrNull(value) {
        if (value == null) {
            return "";
        }
        if (value === "") {
            return 0;
        }
        if (isNaN(value)) {
            return value;
        }
        return parseInt(value);
    },

    formatFloat(value) {
        return parseFloat(value).toFixed(2);
    },

    formatKilometersAndMeters(meters) {
        return Math.trunc(meters / 1000) + " km " + (meters % 1000) + " m";
    },
};

export default NumberUtil;
