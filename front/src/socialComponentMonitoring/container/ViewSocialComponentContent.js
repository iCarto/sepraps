import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {Outlet} from "react-router-dom";

import {SocialComponentMonitoringService} from "socialComponentMonitoring/service";
import {SIDEBAR_PANEL_DRAWER_WIDTH} from "base/ui/app/config/measurements";

import {ViewOrUpdateSocialComponentMonitoringDataContent} from ".";
import {ViewSocialComponentTrainingsContent} from "training/container";
import {ViewOrUpdateFilesDataContent} from "base/file/components";
import {ViewOrUpdateCommentsContent} from "component/container";
import {SidebarPanelDrawer} from "base/ui/sidebar";

import styled from "@mui/material/styles/styled";
import Stack from "@mui/system/Stack";

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
            marginRight: SIDEBAR_PANEL_DRAWER_WIDTH - 240,
        }),
    })
);

const ViewSocialComponentContent = () => {
    const [isSidebarPanelOpen, setSidebarPanelOpen] = useState(false);

    const {socialComponentId} = useParams();

    const [socialComponentMonitoring, setSocialComponentMonitoring] = useState(null);
    const [trainings, setTrainings] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setSocialComponentMonitoring(null);
        SocialComponentMonitoringService.get(socialComponentId).then(data => {
            setSocialComponentMonitoring(data);
        });
        SocialComponentMonitoringService.getTrainings(socialComponentId).then(data => {
            setTrainings(data);
        });
    }, [socialComponentId, location.state?.lastRefreshDate]);

    return (
        socialComponentMonitoring && (
            <PageContainer open={isSidebarPanelOpen}>
                <Stack spacing={1}>
                    <ViewOrUpdateSocialComponentMonitoringDataContent
                        socialComponent={socialComponentMonitoring}
                    />
                    <ViewSocialComponentTrainingsContent
                        socialComponent={socialComponentMonitoring}
                        trainings={trainings}
                    />
                    <ViewOrUpdateFilesDataContent
                        folderPath={socialComponentMonitoring.folder}
                    />
                    <ViewOrUpdateCommentsContent
                        entity={socialComponentMonitoring}
                        service={SocialComponentMonitoringService}
                    />
                </Stack>
                <SidebarPanelDrawer isSidebarPanelOpen={isSidebarPanelOpen}>
                    <Outlet context={[setSidebarPanelOpen]} />
                </SidebarPanelDrawer>
            </PageContainer>
        )
    );
};

export default ViewSocialComponentContent;
