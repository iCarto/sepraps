import {availableLocales} from "./i18n.config";

const config = {
    locales: availableLocales.map(locale => locale.value),
    catalogs: [
        {
            path: "<rootDir>/src/locales/{locale}",
            include: ["src"],
        },
    ],
};

export default config;
