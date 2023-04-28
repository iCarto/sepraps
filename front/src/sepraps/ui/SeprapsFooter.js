import {CUSTOM_FONT_FAMILY} from "Theme";
import {LogoLink} from "base/navigation/components";
import {Footer, FooterTextLink} from "base/ui/footer";

const SeprapsFooter = ({isFixed = false}) => {
    const logoHeight = "36px";
    const logoHeightMobile = "28px";

    const seprapsFooterLinks = [
        <FooterTextLink
            to="https://www.xunta.gal/aviso-legal-do-portal-da-xunta"
            title="Página de Aviso Legal de SENASA"
            text="Aviso legal"
        />,
    ];

    const seprapsFooterLogo = (
        <LogoLink
            href=""
            title="Navega a la web de SENASA"
            src="/images/footer_logo.png"
            alt="Logo de SENASA"
            style={{my: "14px"}}
            logoHeight={logoHeight}
            logoHeightMobile={logoHeightMobile}
        />
    );

    return (
        <Footer
            text="© 2023 SENASA"
            fontFamily={CUSTOM_FONT_FAMILY}
            position={isFixed ? "fixed" : "relative"}
        />
    );
};

export default SeprapsFooter;
