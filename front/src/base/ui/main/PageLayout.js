import {useState} from "react";
import {Outlet} from "react-router-dom";

import {
    FOOTER_HEIGHT,
    PAGE_MENU_DRAWER_WIDTH,
    SIDEBAR_PANEL_DRAWER_WIDTH,
    SUBPAGE_MENU_DRAWER_WIDTH,
} from "../app/config/measurements";
import {SidebarPanelDrawer} from "../sidebar";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";

const PageContainer = styled("div", {shouldForwardProp: prop => prop !== "open"})(
    ({theme, open}) => ({
        flexGrow: 1,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: SIDEBAR_PANEL_DRAWER_WIDTH,
        }),
    })
);

const PageLayout = ({
    children = null,
    menu = null,
    context = [],
    subPage = false,
    disablePadding = false,
    styleProps = {},
}) => {
    const [isSidebarPanelOpen, setSidebarPanelOpen] = useState(false);

    const drawerWidth = subPage ? SUBPAGE_MENU_DRAWER_WIDTH : PAGE_MENU_DRAWER_WIDTH;

    return (
        <PageContainer open={isSidebarPanelOpen} sx={styleProps}>
            {menu}
            <Box
                role="page-container"
                sx={{
                    p: subPage && !disablePadding ? 1 : "unset",
                    marginLeft: menu ? `${drawerWidth}px` : "",
                }}
                style={{minHeight: `calc(100vh - ${FOOTER_HEIGHT}px`}}
            >
                {children ? children : <Outlet context={[...context]} />}
            </Box>
            {children && (
                <SidebarPanelDrawer isSidebarPanelOpen={isSidebarPanelOpen}>
                    <Outlet context={[...context, setSidebarPanelOpen]} />
                </SidebarPanelDrawer>
            )}
        </PageContainer>
    );
};

export default PageLayout;
