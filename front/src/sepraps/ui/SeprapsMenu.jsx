import {AppMenu} from "base/ui/app/components";
import {AccountMenu} from "base/user/components";
import MenuItem from "@mui/material/MenuItem";

import {msg} from "@lingui/macro";
import {useLingui} from "@lingui/react";

const SeprapsMenu = () => {
    const {_} = useLingui();

    const menuItems = [
        {
            name: _(msg`Proyectos`),
            to: "projects",
            pathname: "projects",
        },
        {
            name: _(msg`Contratos`),
            to: "contracts",
            pathname: "contracts",
        },
        {
            name: _(msg`Programas`),
            to: "financingprograms",
            pathname: "financingprograms",
        },
        {
            name: _(msg`Prestadores de servicios`),
            to: "providers",
            pathname: "providers",
        },
        {
            name: _(msg`Informes de viaje`),
            to: "field-reports",
            pathname: "field-reports",
        },
    ];

    return (
        <AppMenu menuItems={menuItems}>
            <MenuItem sx={{marginLeft: "auto"}}>
                <AccountMenu />
            </MenuItem>
        </AppMenu>
    );
};

export default SeprapsMenu;
