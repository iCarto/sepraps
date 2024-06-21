import {useState, createContext, useContext, useEffect} from "react";
import {I18nProvider} from "@lingui/react";
import {i18n} from "@lingui/core";
import {defaultLocale, availableLocales} from "../../../../i18n.config";
import {dynamicActivate} from "base/i18n/lingui/i18n.lingui.config";

let LinguiI18NContext = createContext(null);

export default function Lingui18NProvider({children}) {
    const [selectedLocale, setSelectedLocale] = useState(defaultLocale);

    useEffect(() => {
        dynamicActivate(selectedLocale);
    }, [selectedLocale]);

    let value = {selectedLocale, setSelectedLocale, availableLocales};

    return (
        <LinguiI18NContext.Provider value={value}>
            <I18nProvider i18n={i18n}>{children}</I18nProvider>
        </LinguiI18NContext.Provider>
    );
}

function useLinguiI18N() {
    return useContext(LinguiI18NContext);
}

export {useLinguiI18N};
