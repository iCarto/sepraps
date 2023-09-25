import {AppMenu} from "base/ui/app/components";
import {AccountMenu} from "base/user/components";
import MenuItem from "@mui/material/MenuItem";

const SeprapsMenu = () => {
    const menuItems = [
        {
            name: "Contratos",
            to: "contracts",
            pathname: "contracts",
        },
        {
            name: "Proyectos",
            to: "projects",
            pathname: "projects",
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
        </AppMenu>
    );
};

export default SeprapsMenu;
