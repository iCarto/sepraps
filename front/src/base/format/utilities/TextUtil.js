const TextUtil = {
    capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    },

    convertDBTags(dbTag) {
        const words = dbTag.split("_").map(word => {
            if (word.length >= 1 && word.length <= 3) {
                return word;
            }
            return this.capitalize(word);
        });

        const result = words.join(" ");

        return this.capitalize(result);
    },
};

export default TextUtil;
