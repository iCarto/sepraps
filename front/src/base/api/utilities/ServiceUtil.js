const ServiceResponseContentType = Object.freeze({
    GEOJSON: "application/geo+json",
    CSV: "text/csv",
    SHP: "aplication/x-shapefile",
    PNG: "image/png",
    JPG: "image/jpg",
    PDF: "application/pdf",
    JSON: "application/json",
    EXCEL: "application/vnd.ms-excel",
});

const ServiceRequestFormat = Object.freeze({
    GEOJSON: "geojson",
    CSV: "csv",
    SHP: "shp",
    PNG: "png",
    JPG: "jpg",
    PDF: "pdf",
    JSON: "json",
    EXCEL: "excel",
});

const ServiceUtil = {
    getQueryString(page, filter, sort, order) {
        return `${this.getPageQueryString(page)}&${this.getFilterQueryString(
            filter
        )}&${this.getOrderQueryString(sort, order)}&`;
    },

    getPageQueryString(page) {
        return page != null ? `page=${page}` : "";
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

    getGeoFilterQueryString(filter) {
        if (!filter) {
            return "";
        }
        if (filter["buffer"]) {
            filter = {...filter, concello: `${filter["concello"]}_${filter["buffer"]}`};
        }
        return this.getFilterQueryString(filter);
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
            case ServiceRequestFormat.PDF:
                return {
                    Accept: ServiceResponseContentType.PDF,
                };
            case ServiceRequestFormat.EXCEL:
                return {
                    Accept: ServiceResponseContentType.EXCEL,
                };
            default:
                return {
                    Accept: ServiceResponseContentType.JSON,
                };
        }
    },
};

export {ServiceUtil as default, ServiceResponseContentType, ServiceRequestFormat};
