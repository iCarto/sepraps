import {
    localCurrencyFormatter,
    localIntegerFormatter,
    localDecimalFormatter,
    DECIMAL_SEPARATOR,
} from "base/format/config/i18n";

const countOccurrencesOfSubstring = (string, substring) => {
    return (string.match(new RegExp(substring, "g")) || []).length;
};

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

    /**
     * Formats a numerical or string value to a specified decimal size,
     * removing trailing zeros when possible.
     *
     * @param {number|string} value - The numerical or string value to be formatted.
     * @param {number} [decimalSize=2] - The desired decimal size (default is 2).
     * @returns {string} - The formatted value as a string.
     *
     * @example
     * // Returns "123.4"
     * const result = formatDecimalWithoutZero(123.42, 1);
     *
     * @example
     * // Returns "456.78"
     * const result = formatDecimalWithoutZero("456.7800");
     */
    formatDecimalWithoutZeros(value, decimalSize = 2) {
        if (value === null || value === undefined || value === "") {
            return "";
        }

        let floatValue;

        if (typeof value === "number") {
            floatValue = value;
        } else if (typeof value === "string") {
            floatValue = parseFloat(value.replace(",", "."));
        } else {
            return value;
        }

        const fixedNumber = floatValue.toFixed(decimalSize);
        const hasNonZeroDecimals = parseFloat(fixedNumber) % 1 !== 0;

        const formattedNumber = hasNonZeroDecimals
            ? fixedNumber.replace(".", ",")
            : parseFloat(fixedNumber).toString();

        return formattedNumber;
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
        if (value || value === 0) {
            return localIntegerFormatter.format(value);
        } else return "";
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

    formatFloat(value, decimalSize = 2, replaceDecimalSeparator = true) {
        if (isNaN(value) || value === 0) {
            return value;
        } else if (!value) {
            return "";
        }
        const floatNumber = parseFloat(value);

        if (replaceDecimalSeparator) {
            return floatNumber.toFixed(decimalSize).replace(".", DECIMAL_SEPARATOR);
        } else {
            return floatNumber.toFixed(decimalSize);
        }
    },

    formatMillions(value, displaySymbol = true) {
        // TODO review when changing to currency config
        const formattedValueInMillions =
            Math.abs(value) > 999999
                ? Math.sign(value) * (Math.abs(value) / 1000000).toFixed(0)
                : Math.sign(value) * Math.abs(value);

        return `${formattedValueInMillions
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}${displaySymbol ? "M" : ""}`;
    },

    formatKilometersAndMeters(meters) {
        return Math.trunc(meters / 1000) + " km " + (meters % 1000) + " m";
    },

    parseNumber(value) {
        if (typeof value === "string") {
            return Number(value);
        } else {
            return value || 0;
        }
    },

    parseDecimal(value) {
        return value.replace(DECIMAL_SEPARATOR, ".");
    },

    parseFloat(value) {
        if (!value) {
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

    parseInteger(value) {
        if (!value) {
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

    cleanDecimal(value) {
        const notAllowedCharacters = new RegExp(`[^\\d${DECIMAL_SEPARATOR}]`, "g");
        let cleanValue = value.replace(notAllowedCharacters, "");
        const hasMultipleSeparators =
            countOccurrencesOfSubstring(cleanValue, DECIMAL_SEPARATOR) > 1;

        if (hasMultipleSeparators) {
            const lastDecimalSeparatorIndex = cleanValue.lastIndexOf(DECIMAL_SEPARATOR);
            cleanValue =
                cleanValue.slice(0, lastDecimalSeparatorIndex) +
                cleanValue.slice(lastDecimalSeparatorIndex + 1);
        }
        return cleanValue;
    },

    cleanInteger(value) {
        if (typeof value === "string") {
            return value.replace(/[^0-9]/g, "");
        }
        return value;
    },

    getPercentage(value, total) {
        const percentage = NumberUtil.formatDecimal((value * 100) / total);
        return `${percentage}%`;
    },
};

export default NumberUtil;
