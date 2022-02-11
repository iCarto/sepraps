import {useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header";
import MainMenu, {DrawerHeader} from "./MainMenu";
import Box from "@mui/material/Box";

const MainLayout = () => {
    const [drawerOpened, setDrawerOpened] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpened(drowerOpenedPrev => !drowerOpenedPrev);
    };

    return (
        <Box sx={{display: "flex"}}>
            <Header onShowDrawer={handleDrawerToggle} />
            <MainMenu drowerOpened={drawerOpened} onDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{flexGrow: 1, bgcolor: "background.default"}}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
