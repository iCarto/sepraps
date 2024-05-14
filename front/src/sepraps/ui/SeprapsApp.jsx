import {AppLayout} from "base/ui/app/components";
import {SeprapsFooter, SeprapsHeaderHero, SeprapsMenu} from "sepraps/ui";

const SeprapsApp = () => {
    return (
        <AppLayout
            hero={<SeprapsHeaderHero />}
            menu={<SeprapsMenu />}
            // footer={<SeprapsFooter/>}
        />
    );
};

export default SeprapsApp;
