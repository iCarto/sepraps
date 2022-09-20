import {format, parse, add, addDays, differenceInCalendarMonths} from "date-fns";

import TextUtil from "./TextUtil";

import {DATE_FORMATS, USED_LOCALE} from "config";

const DateUtil = {
    // Transform to UI format date DD/MM/YYYY
    formatDate(date, dateFormat = DATE_FORMATS.CLIENT_DATEFORMAT) {
        if (!date) {
            return "";
        }
        return format(date, dateFormat);
    },
    formatDateForAPI(date) {
        return DateUtil.formatDate(date, DATE_FORMATS.API_DATEFORMAT);
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
    formatDateTimeForFilenames(date) {
        return DateUtil.formatDate(date, DATE_FORMATS.FILENAME_DATETIMEFORMAT);
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
    parseDate(date, dateFormat = DATE_FORMATS.CLIENT_DATEFORMAT) {
        return parse(date, dateFormat, new Date());
    },
    parseDateFromApi(dateString) {
        return DateUtil.parseDate(dateString, DATE_FORMATS.API_DATEFORMAT);
    },
    addMonths(date, months) {
        return add(date, {months});
    },
    getMonthName(month) {
        return TextUtil.capitalize(
            format(new Date(null, month - 1), "LLLL", {locale: USED_LOCALE})
        );
    },
    getMonthInDate(date) {
        return TextUtil.capitalize(
            format(new Date(date), "LLL", {locale: USED_LOCALE})
        );
    },
    getDayInDate(date) {
        return format(date, "d");
    },
    getYearInDate(date) {
        return format(date, "yyyy");
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
        const now = new Date(Date.now());
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
