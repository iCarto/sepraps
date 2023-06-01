import {createEvents, events_api_adapter} from "event/model";
import {AuthApiService} from "../../base/api/service";

const basePath = "/api/app/comingevents";

const EventService = {
    getEvents() {
        return AuthApiService.get(basePath).then(response => {
            return createEvents(events_api_adapter(response));
        });
    },
};

export default EventService;
