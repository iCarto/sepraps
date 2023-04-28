import {Outlet} from "react-router-dom";
import {DrawerHeader} from "./ModuleMenu";
import Box from "@mui/material/Box";

const ModuleLayout = ({title = "", menu = null}) => {
    return (
        <Box sx={{display: "flex"}} role="main">
            {menu}
            <Box sx={{flexGrow: 1}} role="module">
                <DrawerHeader role="drawer-header" />
                <Outlet />
            </Box>
        </Box>
    );
};

export default ModuleLayout;
