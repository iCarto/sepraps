import {useState} from "react";
import {Outlet} from "react-router-dom";
import styled from "@mui/material/styles/styled";

import {SidebarPanelDrawer} from "../sidebar";
import {SIDEBAR_PANEL_DRAWER_WIDTH} from "../app/config/measurements";

const ContentContainer = styled("main", {shouldForwardProp: prop => prop !== "open"})(
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

const ContentLayout = ({children, context = []}) => {
    const [isSidebarPanelOpen, setSidebarPanelOpen] = useState(false);

    return (
        <ContentContainer open={isSidebarPanelOpen}>
            {children ? children : <Outlet context={[...context]} />}
            {children && (
                <SidebarPanelDrawer isSidebarPanelOpen={isSidebarPanelOpen}>
                    <Outlet context={[...context, setSidebarPanelOpen]} />
                </SidebarPanelDrawer>
            )}
        </ContentContainer>
    );
};

export default ContentLayout;
