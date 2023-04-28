const ErrorUtil = {
    getMessage(error) {
        console.log({error});
        try {
            const jsonError = JSON.parse(error.message);
            console.log({jsonError});
            if (jsonError.detail) {
                return jsonError.detail;
            }
            return Object.keys(jsonError)
                .map(key => `${key}: ${jsonError[key].join(", ")}`)
                .join("\n");
        } catch (e) {
            console.log({e});
            return error.message ? error.message : error;
        }
    },
};

export default ErrorUtil;
