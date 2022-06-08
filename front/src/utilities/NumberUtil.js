var localCurrencyFormatter = new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
});
var localNumberFormatter = new Intl.NumberFormat("es-PY");

const NumberUtil = {
    formatDecimal(value, decimalSize = 2) {
        if (!value || isNaN(value)) {
            return "";
        }
        const floatNumber = parseFloat(value);
        return floatNumber.toFixed(decimalSize).replace(".", ",");
    },

    formatInteger(value) {
        if (!value || isNaN(value)) {
            return value;
        }
        return localNumberFormatter.format(value);
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
            : localNumberFormatter;
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
