import {AppMenu} from "base/ui/app/components";
import {AccountMenu} from "base/user/components";
import MenuItem from "@mui/material/MenuItem";
import {SeprapsHelp} from ".";

const SeprapsMenu = () => {
    const menuItems = [
        {
            name: "Proyectos",
            to: "projects",
            pathname: "projects",
        },
        {
            name: "Contratos",
            to: "contracts",
            pathname: "contracts",
        },
        {
            name: "Programas",
            to: "financingprograms",
            pathname: "financingprograms",
        },
        {
            name: "Prestadores de servicios",
            to: "providers",
            pathname: "providers",
        },
        {
            name: "Informes de viaje",
            to: "field-reports",
            pathname: "field-reports",
        },
    ];

    return (
        <AppMenu menuItems={menuItems}>
            <MenuItem sx={{marginLeft: "auto"}}>
                <AccountMenu />
            </MenuItem>
            <SeprapsHelp />
        </AppMenu>
    );
};

export default SeprapsMenu;
