import {useState} from "react";
import {Outlet} from "react-router-dom";

import Header from "./Header";
import ModuleMenu, {DrawerHeader} from "./ModuleMenu";
import Box from "@mui/material/Box";

const MainLayout = () => {
    const [drawerOpened, setDrawerOpened] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpened(drowerOpenedPrev => !drowerOpenedPrev);
    };

    return (
        <Box sx={{display: "flex"}}>
            <Header onShowDrawer={handleDrawerToggle} />
            <ModuleMenu open={drawerOpened} onToggle={handleDrawerToggle} />
            <Box component="main" sx={{flexGrow: 1}}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
