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
        }
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
        if (!value || value === "0") return displaySymbol ? "0M" : "0";

        const oneMillion = 1000000;
        const valueInMillions = this.formatFloat(value / oneMillion);

        let formattedValueInMillions = 0;
        if (valueInMillions) {
            formattedValueInMillions = valueInMillions.endsWith(",00")
                ? valueInMillions.slice(0, -3)
                : valueInMillions;
        }

        if (displaySymbol) return `${formattedValueInMillions}M`;

        return formattedValueInMillions;
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
