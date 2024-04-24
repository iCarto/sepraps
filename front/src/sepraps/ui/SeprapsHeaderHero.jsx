import {LogoLink} from "base/navigation/components";
import {APP_NAME, APP_NAME_LONG} from "sepraps/config/appInfo";
import {HeaderHero} from "base/ui/header";

const SeprapsHeaderHero = () => {
    const logoHeight = "48px";

    const seprapsLeftLogos = [
        <LogoLink
            href="/"
            textLogo={APP_NAME_LONG}
            title={`Navegue a la página de inicio de ${APP_NAME}`}
            targetBlank={false}
            style={{fontSize: 18, maxWidth: "400px", color: "#fff"}}
        />,
    ];

    const seprapsRightLogo = [
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
