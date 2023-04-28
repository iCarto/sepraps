class FetchError extends Error {
    json() {
        try {
            return JSON.parse(this.message);
        } catch (error) {
            if (error instanceof SyntaxError) {
                // Message is not a JSON
                return null;
            }
            // Something weird happened, so let the error propagate
            throw error;
        }
    }
}

export default FetchError;
