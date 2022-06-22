import {createEvents, events_api_adapter} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/comingevents";

const EventService = {
    getEvents() {
        return AuthApiService.get(basePath).then(response => {
            return createEvents(events_api_adapter(response));
        });
    },
};

export default EventService;
