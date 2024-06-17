//Date formats

export const DATE_FORMATS = {
    CLIENT_DATEFORMAT: "dd/MM/yyyy",
    CLIENT_DATEMONTHFORMAT: "MM/yyyy",
    CLIENT_DATETIMEFORMAT: "dd/MM/yyyy HH:mm",
    CLIENT_TIMEFORMAT: "HH:mm",
    FILENAME_DATETIMEFORMAT: "yyyyMMddHHmmss",
    API_DATEFORMAT: "yyyy-MM-dd",
};

export {es as USED_LOCALE} from "date-fns/locale";

// Number formats

export const DECIMAL_SEPARATOR = ",";
export const localCurrencyFormatter = new Intl.NumberFormat(
    __CUSTOM_LOCALE__ || "es-PY",
    {
        style: "currency",
        currency: __CUSTOM_CURRENCY__ || "PYG",
    }
);
export const localIntegerFormatter = new Intl.NumberFormat(
    __CUSTOM_LOCALE__ || "es-PY"
);
export const localDecimalFormatter = new Intl.NumberFormat(
    __CUSTOM_LOCALE__ || "es-PY",
    {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }
);
export const CURRENCY_SYMBOL = localCurrencyFormatter
    .formatToParts(1)
    .find(x => x.type === "currency").value;
