import {createEvents, event_api_adapter} from "model";
import AuthApiService from "./AuthApiService";

const basePath = "/api/monitoring/events";

const EventService = {
    getEvents() {
        // TO-DO: Replace by "get" when API for events/coming events is ready
        return AuthApiService.getFake(basePath).then(response => {
            return createEvents(event_api_adapter(response));
        });
    },
};

export default EventService;
