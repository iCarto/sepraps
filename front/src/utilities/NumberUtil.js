var formatter = new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
});

const NumberUtil = {
    formatDecimal(number, decimalSize) {
        if (!number) {
            return "";
        }
        const floatNumber = parseFloat(number);
        return floatNumber.toFixed(decimalSize).replace(".", ",");
    },

    formatCurrency(number) {
        if (!number) {
            return "";
        }
        return formatter.format(number);
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
