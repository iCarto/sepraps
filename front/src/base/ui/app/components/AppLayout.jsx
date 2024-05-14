import {Outlet} from "react-router-dom";
import {IdleLogoutTimer} from "base/logout/provider";
import {Header} from "base/ui/header";

import Box from "@mui/material/Box";

const AppLayout = ({hero = null, menu = null, footer = null}) => {
    return (
        // <IdleLogoutTimer>
        <Box
            role="wrapper"
            sx={{display: "flex", flexDirection: "column", minHeight: "100vh"}}
        >
            <Header hero={hero} menu={menu} />
            <Outlet />
            {footer}
        </Box>
        // </IdleLogoutTimer>
    );
};

export default AppLayout;
