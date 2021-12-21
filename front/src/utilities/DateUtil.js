import {format, parse} from "date-fns";

export const DATE_FORMATS = {
    CLIENT_DATEFORMAT: "dd/MM/yyyy",
    CLIENT_DATEMONTHFORMAT: "MM/yyyy",
    CLIENT_DATETIMEFORMAT: "dd/MM/yyyy HH:mm",
    CLIENT_TIMEFORMAT: "HH:mm",
    FILE_DATETIMEFORMAT: "yyyyMMddHHmmss",
};

const DateUtil = {
    // Transform to UI format date DD/MM/YYYY
    formatDate(date, dateFormat = DATE_FORMATS.CLIENT_DATEFORMAT) {
        return format(date, dateFormat);
    },
    formatDateMonth(date, dateFormat = DATE_FORMATS.CLIENT_DATEMONTHFORMAT) {
        return format(date, dateFormat);
    },
    formatDateTime(date, dateFormat = DATE_FORMATS.CLIENT_DATETIMEFORMAT) {
        return format(date, dateFormat);
    },
    formatTime(date) {
        return format(date, DATE_FORMATS.CLIENT_TIMEFORMAT);
    },
    formatHoursAndMinutes(millis) {
        return (
            Math.trunc(millis / 3600000) +
            " h " +
            Math.trunc((millis / 60000) % 60) +
            " min"
        );
    },
    parseDateTime(date, dateFormat = DATE_FORMATS.CLIENT_DATETIMEFORMAT) {
        return parse(date, dateFormat, new Date());
    },
};

export default DateUtil;
