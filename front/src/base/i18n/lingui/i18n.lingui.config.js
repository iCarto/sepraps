import {i18n} from "@lingui/core";

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale) {
    /*
    // Prueba de concepto con carga de archivo remoto y carga de archivo local mezcladas
    const remoteMessages = await fetch(`http://localhost:8000/${locale}.json`).then(
        response => {
            console.log({response});
            return response.json();
        }
    );
    const {messages} = await import(`./locales/${locale}.po`);
    const allMessages = {...messages, ...remoteMessages};
    console.log({allMessages}); */
    // Messages loaded from path "src/locales"
    const {messages} = await import(`../../../locales/${locale}.po`);
    i18n.load(locale, messages);
    i18n.activate(locale);
}
