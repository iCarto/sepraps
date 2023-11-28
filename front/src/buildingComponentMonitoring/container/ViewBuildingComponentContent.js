import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {Outlet} from "react-router-dom";

import {BuildingComponentMonitoringService} from "buildingComponentMonitoring/service";
import {SIDEBAR_PANEL_DRAWER_WIDTH} from "base/ui/app/config/measurements";

import {
    ViewOrUpdateBuildingComponentFilesDataContent,
    ViewOrUpdateBuildingComponentMonitoringDataContent,
    ViewOrUpdateBuildingComponentTechnicalDataContent,
} from ".";
import {ViewBuildingComponentMonitoringCommentsContent} from "comment/container";
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

const ViewBuildingComponentContent = () => {
    const [isSidebarPanelOpen, setSidebarPanelOpen] = useState(false);

    const {buildingComponentId} = useParams();

    const [buildingComponentMonitoring, setBuildingComponentMonitoring] = useState(
        null
    );
    const location = useLocation();

    useEffect(() => {
        setBuildingComponentMonitoring(null);
        BuildingComponentMonitoringService.get(buildingComponentId).then(data => {
            setBuildingComponentMonitoring(data);
        });
    }, [buildingComponentId, location.state?.lastRefreshDate]);

    return (
        buildingComponentMonitoring && (
            <PageContainer open={isSidebarPanelOpen}>
                <Stack spacing={1}>
                    <ViewOrUpdateBuildingComponentMonitoringDataContent
                        projectId={buildingComponentMonitoring.project}
                        buildingComponent={buildingComponentMonitoring}
                    />
                    <ViewOrUpdateBuildingComponentTechnicalDataContent
                        buildingComponent={
                            buildingComponentMonitoring?.building_component
                        }
                    />
                    <ViewOrUpdateBuildingComponentFilesDataContent
                        buildingComponentMonitoring={buildingComponentMonitoring}
                    />
                    <ViewBuildingComponentMonitoringCommentsContent
                        buildingComponentMonitoring={buildingComponentMonitoring}
                    />
                </Stack>
                <SidebarPanelDrawer isSidebarPanelOpen={isSidebarPanelOpen}>
                    <Outlet context={[setSidebarPanelOpen]} />
                </SidebarPanelDrawer>
            </PageContainer>
        )
    );
};

export default ViewBuildingComponentContent;
