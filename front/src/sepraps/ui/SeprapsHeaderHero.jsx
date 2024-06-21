import {LogoLink} from "base/navigation/components";
import {APP_NAME, APP_NAME_LONG} from "sepraps/config/appInfo";
import {HeaderHero} from "base/ui/header";

import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";

import {LanguageToggler} from "base/i18n/lingui";

const SeprapsHeaderHero = () => {
    const {_} = useLingui();
    const logoHeight = "48px";

    const seprapsLeftLogos = [
        <LogoLink
            href="/"
            textLogo={_(msg`Seguimiento de programas de agua potable y saneamiento`)}
            title={`Navegue a la página de inicio de ${APP_NAME}`}
            targetBlank={false}
            style={{fontSize: 18, maxWidth: "400px", color: "#fff"}}
        />,
    ];

    const seprapsRightLogo = [
        <LanguageToggler />,
        <LogoLink
            href="https://www.senasa.gov.py/"
            title="Navegue a la web de SENASA"
            src="/logo/logo_senasa.jpg"
            alt="Logos de SENASA"
            logoHeight={logoHeight}
        />,
    ];

    return (
        <>
            <HeaderHero left={seprapsLeftLogos} right={seprapsRightLogo} />
        </>
    );
};

export default SeprapsHeaderHero;
