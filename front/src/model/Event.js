import {DateUtil} from "utilities";

class Events extends Array {}

const event_api_adapter = event => {
    event["date"] = DateUtil.parseDateFromApi(event["date"]);
    return event;
};

const events_api_adapter = events => events.map(event_api_adapter);

const event_view_adapter = event => {
    event["date"] = !!event["date"] ? DateUtil.formatDateForAPI(event["date"]) : null;
    return event;
};

const createEvents = (data = []) => {
    const events = Events.from(data, event => createEvent(event));
    return events;
};

const createEvent = ({
    id = null,
    type = "",
    title = "",
    date = null,
    message = "",
    url = "",
} = {}) => {
    const publicApi = {
        id,
        type,
        title,
        date,
        message,
        url,
    };

    return Object.freeze(publicApi);
};

export {
    createEvent as default,
    createEvents,
    event_api_adapter,
    events_api_adapter,
    event_view_adapter,
};
