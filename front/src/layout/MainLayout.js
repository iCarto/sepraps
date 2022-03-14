import {Outlet} from "react-router-dom";

import {Header} from "layout";
import ModuleMenu, {DrawerHeader} from "./ModuleMenu";
import Box from "@mui/material/Box";

const MainLayout = () => {
    return (
        <Box sx={{display: "flex"}}>
            <Header />
            <ModuleMenu />
            <Box sx={{flexGrow: 1}}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
