import {useState} from "react";
import {Outlet} from "react-router-dom";

import {SidebarPanelDrawer} from "../sidebar";
import {ContentContainer} from ".";
import Stack from "@mui/material/Stack";

const ContentLayout = ({children, context = []}) => {
    const [isSidebarPanelOpen, setSidebarPanelOpen] = useState(false);

    return (
        <>
            <ContentContainer open={isSidebarPanelOpen}>
                <Stack spacing={1}>
                    {children ? children : <Outlet context={[...context]} />}
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

export default ContentLayout;
