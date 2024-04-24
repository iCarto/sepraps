import {useState} from "react";
import {Outlet} from "react-router-dom";

import {
    SIDEBAR_PANEL_DRAWER_WIDTH,
    SELECTOR_RIGHT_PANEL_WIDTH,
} from "../app/config/measurements";

import {SidebarPanelDrawer} from "../sidebar";
import {ContentContainer} from ".";
import Stack from "@mui/material/Stack";

const ContentLayoutWithAside = ({children, context = []}) => {
    const [isSidebarPanelOpen, setSidebarPanelOpen] = useState(false);

    return (
        <>
            <ContentContainer
                open={isSidebarPanelOpen}
                openMarginRight={
                    SIDEBAR_PANEL_DRAWER_WIDTH - SELECTOR_RIGHT_PANEL_WIDTH
                }
            >
                <Stack spacing={1}>
                    {children ? (
                        children
                    ) : (
                        <Outlet context={[...context, setSidebarPanelOpen]} />
                    )}
                </Stack>
            </ContentContainer>
            {children && (
                <SidebarPanelDrawer isSidebarPanelOpen={isSidebarPanelOpen}>
                    <Outlet context={[...context, setSidebarPanelOpen]} />
                </SidebarPanelDrawer>
            )}
        </>
    );
};

export default ContentLayoutWithAside;
