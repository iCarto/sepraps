// TO-DO: Remove fakeDataService when API for notifications/coming events is ready
export {default as fakeDataService} from "./file/JsonFileService";
export {default as dataService} from "./http/FetchService";
export {default as uploadService} from "./http/XMLHttpRequestService";
export {default as Storage} from "./storage/Storage";
export {USER, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROLES} from "./auth";
export {DATE_FORMATS, USED_LOCALE} from "./i18n";
export {
    localCurrencyFormatter,
    localIntegerFormatter,
    localDecimalFormatter,
} from "./i18n";
