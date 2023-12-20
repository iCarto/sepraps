import {useState} from "react";
import {Outlet} from "react-router-dom";

import {
    FOOTER_HEIGHT,
    PAGE_MENU_DRAWER_WIDTH,
    SUBPAGE_MENU_DRAWER_WIDTH,
} from "base/ui/app/config/measurements";
import {SidebarPanelDrawer} from "base/ui/sidebar";
import Box from "@mui/material/Box";
import ContentContainer from "./ContentContainer";

const PageLayout = ({
    children = null,
    menu = null,
    context = [],
    subPage = false,
    disablePadding = false,
    style = {},
}) => {
    const [isSidebarPanelOpen, setSidebarPanelOpen] = useState(false);

    const drawerWidth = subPage ? SUBPAGE_MENU_DRAWER_WIDTH : PAGE_MENU_DRAWER_WIDTH;

    return (
        <ContentContainer open={isSidebarPanelOpen} style={{...style}}>
            {menu}
            <Box
                role="page-container"
                sx={{
                    p: subPage && !disablePadding ? 1 : "unset",
                    marginLeft: menu ? `${drawerWidth}px` : "",
                }}
                style={{minHeight: `calc(100vh - ${FOOTER_HEIGHT}px`}}
            >
                {children ? (
                    children
                ) : (
                    <Outlet
                        context={[...context, isSidebarPanelOpen, setSidebarPanelOpen]}
                    />
                )}
            </Box>
            {children && (
                <SidebarPanelDrawer isSidebarPanelOpen={isSidebarPanelOpen}>
                    <Outlet context={[...context, setSidebarPanelOpen]} />
                </SidebarPanelDrawer>
            )}
        </ContentContainer>
    );
};

export default PageLayout;
