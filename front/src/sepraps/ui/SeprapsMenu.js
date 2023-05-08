import {AppMenu} from "base/ui/app/components";
import {AccountMenu} from "base/user/components";
import MenuItem from "@mui/material/MenuItem";

const SeprapsMenu = () => {
    const menuItems = [
        {
            name: "Contratos",
            to: "contracts/list",
            pathname: "contracts",
        },
        {
            name: "Proyectos",
            to: "projects/list",
            pathname: "projects",
        },
        {
            name: "Prestadores de servicios",
            to: "providers/list",
            pathname: "providers",
        },
        {
            name: "Resultados",
            to: "stats/phase",
            pathname: "stats",
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
