const ServiceResponseContentType = Object.freeze({
    GEOJSON: "application/geo+json",
    CSV: "text/csv",
    SHP: "aplication/x-shapefile",
    PNG: "image/png",
    JPG: "image/jpg",
    PDF: "application/pdf",
    JSON: "application/json",
});

const ServiceRequestFormat = Object.freeze({
    GEOJSON: "geojson",
    CSV: "csv",
    SHP: "shp",
    PNG: "png",
    JPG: "jpg",
    PDF: "pdf",
    JSON: "json",
});

const ServiceUtil = {
    getQueryString(page, filter, sort, order, template) {
        return `${this.getPageQueryString(page)}&${this.getFilterQueryString(
            filter
        )}&${this.getOrderQueryString(sort, order)}&${this.getTemplateString(
            template
        )}&`;
    },

    getPageQueryString(page) {
        return page != null ? `page=${page}` : "";
    },

    getTemplateString(template) {
        return template != null ? `template=${template}` : "";
    },

    getFilterQueryString(filter) {
        if (!filter) {
            return "";
        }
        return Object.keys(filter)
            .filter(key => filter[key] != null && filter[key] !== "undefined")
            .map(key => {
                return key + "=" + filter[key];
            })
            .join("&");
    },

    getOrderQueryString(sort, order) {
        if (!sort || !order) {
            return "";
        }
        return `ordering=${order === "desc" ? "-" : ""}${sort}`;
    },

    getAcceptHeader(requestFormat) {
        switch (requestFormat) {
            case ServiceRequestFormat.GEOJSON:
                return {
                    Accept: ServiceResponseContentType.GEOJSON,
                };
            case ServiceRequestFormat.CSV:
                return {
                    Accept: ServiceResponseContentType.CSV,
                };
            case ServiceRequestFormat.SHP:
                return {
                    Accept: ServiceResponseContentType.SHP,
                };
            case ServiceRequestFormat.PNG:
                return {
                    Accept: ServiceResponseContentType.PNG,
                };
            case ServiceRequestFormat.JPG:
                return {
                    Accept: ServiceResponseContentType.JPG,
                };
            case ServiceRequestFormat.PDF:
                return {
                    Accept: ServiceResponseContentType.PDF,
                };
            default:
                return {
                    Accept: ServiceResponseContentType.JSON,
                };
        }
    },
};

export {ServiceUtil as default, ServiceResponseContentType, ServiceRequestFormat};
