import {format, parse, add, addDays, differenceInCalendarMonths} from "date-fns";

import {TextUtil} from "base/format/utilities";
import {DATE_FORMATS, USED_LOCALE} from "base/format/config/i18n";

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

const DateUtil = {
    // Transform to UI format date DD/MM/YYYY
    formatDate(date, dateFormat = DATE_FORMATS.CLIENT_DATEFORMAT) {
        if (!date) {
            return "";
        }
        if (date instanceof Date) {
            if (isValidDate(date)) {
                return format(date, dateFormat);
            }
            return date;
        }
        if (typeof date === "string" && date.includes("T")) {
            return format(new Date(date), dateFormat);
        }
        return format(this.parseDateFromApi(date), dateFormat);
    },
    // Transform to API format
    formatDateForAPI(date) {
        if (typeof date === "object") {
            return this.formatDate(date, DATE_FORMATS.API_DATEFORMAT);
        }
        return date;
    },
    formatDateMonth(date, dateFormat = DATE_FORMATS.CLIENT_DATEMONTHFORMAT) {
        if (!date) {
            return "";
        }
        return this.formatDate(date, dateFormat);
    },
    formatDateTime(date, dateFormat = DATE_FORMATS.CLIENT_DATETIMEFORMAT) {
        if (!date) {
            return "";
        }
        return this.formatDate(date, dateFormat);
    },
    formatDateTimeForFilenames(date) {
        return this.formatDate(date, DATE_FORMATS.FILENAME_DATETIMEFORMAT);
    },
    formatTime(date) {
        if (!date) {
            return "";
        }
        return this.formatDate(date, DATE_FORMATS.CLIENT_TIMEFORMAT);
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
    // Transform from API format (YYYY/MM/DD) to Date()
    parseDateFromApi(dateString) {
        if (dateString) {
            return this.parseDate(dateString, DATE_FORMATS.API_DATEFORMAT);
        } else {
            return null;
        }
    },
    addMonths(date, months) {
        // TODO: Fix https://github.com/date-fns/date-fns/issues/571
        const dateValue = add(new Date(date), {months});
        return add(dateValue, {days: 1});
    },
    getToday() {
        const now = new Date(Date.now());
        now.setHours(0, 0, 0, 0);
        return now;
    },
    getDayInDate(date) {
        return format(new Date(date), "d");
    },
    getMonthInDate(date) {
        return TextUtil.capitalize(
            format(new Date(date), "LLL", {locale: USED_LOCALE})
        );
    },
    getYearInDate(date) {
        return format(new Date(date), "yyyy");
    },
    getMonthName(month) {
        return TextUtil.capitalize(
            format(new Date(null, month - 1), "LLLL", {locale: USED_LOCALE})
        );
    },
    getDateAfterDays(date, amountOfDays) {
        return addDays(this.parseDateFromApi(date), amountOfDays);
    },
    getMonths(firstDate, lastDate) {
        return differenceInCalendarMonths(new Date(lastDate), new Date(firstDate));
    },
    getFirstDayOfCurrentMonth() {
        const today = this.getToday();
        today.setDate(1);
        return today;
    },
    formatYearAndMonth(date) {
        const month = `${new Date(date).getMonth() + 1}`.padStart(2, "0");
        return `${month}-${new Date(date).getFullYear()}`;
    },
};

export default DateUtil;
