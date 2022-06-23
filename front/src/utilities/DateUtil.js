import {format, parse, add, addDays, differenceInCalendarMonths} from "date-fns";
import {es} from "date-fns/locale";
import TextUtil from "./TextUtil";

export const DATE_FORMATS = {
    CLIENT_DATEFORMAT: "dd/MM/yyyy",
    CLIENT_DATEMONTHFORMAT: "MM/yyyy",
    CLIENT_DATETIMEFORMAT: "dd/MM/yyyy HH:mm",
    CLIENT_TIMEFORMAT: "HH:mm",
    FILE_DATETIMEFORMAT: "yyyyMMddHHmmss",
    SERVER_DATEFORMAT: "yyyy-MM-dd",
};

const DateUtil = {
    // Transform to UI format date DD/MM/YYYY
    formatDate(date, dateFormat = DATE_FORMATS.CLIENT_DATEFORMAT) {
        if (!date) {
            return "";
        }
        return format(date, dateFormat);
    },
    formatDateMonth(date, dateFormat = DATE_FORMATS.CLIENT_DATEMONTHFORMAT) {
        if (!date) {
            return "";
        }
        return format(date, dateFormat);
    },
    formatDateTime(date, dateFormat = DATE_FORMATS.CLIENT_DATETIMEFORMAT) {
        if (!date) {
            return "";
        }
        return format(date, dateFormat);
    },
    formatTime(date) {
        if (!date) {
            return "";
        }
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
    getMonthName(month) {
        return TextUtil.capitalize(
            format(new Date(null, month - 1), "LLLL", {locale: es})
        );
    },
    addMonths(date, months) {
        return add(date, {months});
    },
    getDateAfterDays(date, amountOfDays) {
        return addDays(date, amountOfDays);
    },
    formatYearAndMonth(date) {
        return `${date.getMonth() + 1}/${date.getFullYear()}`;
    },
    getMonths(firstDate, lastDate) {
        return differenceInCalendarMonths(lastDate, firstDate);
    },
    getToday() {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return now;
    },
    getFirstDayOfCurrentMonth() {
        const today = this.getToday();
        today.setDate(1);
        return today;
    },
};

export default DateUtil;
