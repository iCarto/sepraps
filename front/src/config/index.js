// TO-DO: Remove fakeDataService when API for notifications/coming events is ready
export {default as fakeDataService} from "./file/JsonFileService";
export {default as dataService} from "./http/FetchService";
export {default as uploadService} from "./http/XMLHttpRequestService";
export {default as Storage} from "./storage/Storage";
