import {AppLayout} from "base/ui/app/components";
import {SeprapsFooter, SeprapsHeaderHero, SeprapsMenu} from "sepraps/ui";

const SeprapsApp = () => {
    return (
        // <SeprapsAppProvider>
        <AppLayout
            hero={<SeprapsHeaderHero />}
            menu={<SeprapsMenu />}
            // footer={<SeprapsFooter/>}
        />
        // </SeprapsAppProvider>
    );
};

export default SeprapsApp;
