//DateUtil

export const DATE_FORMATS = {
    CLIENT_DATEFORMAT: "dd/MM/yyyy",
    CLIENT_DATEMONTHFORMAT: "MM/yyyy",
    CLIENT_DATETIMEFORMAT: "dd/MM/yyyy HH:mm",
    CLIENT_TIMEFORMAT: "HH:mm",
    FILENAME_DATETIMEFORMAT: "yyyyMMddHHmmss",
    API_DATEFORMAT: "yyyy-MM-dd",
};

export {es as USED_LOCALE} from "date-fns/locale";

// NumberUtil

export const localCurrencyFormatter = new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
});
export const localIntegerFormatter = new Intl.NumberFormat("es-PY");
export const localDecimalFormatter = new Intl.NumberFormat("es-PY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
