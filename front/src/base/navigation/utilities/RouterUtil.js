const RouterUtil = {
    getUrlParameter(queryString, name) {
        name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(queryString);
        return results === null
            ? ""
            : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    hasUrlParameter(queryString, name) {
        return this.getUrlParameter(queryString, name) !== "";
    },

    getLastUrlSegment(location) {
        return location.pathname.split("/").slice(-1)[0];
    },
};

export default RouterUtil;
