import {useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";
import {ProjectService} from "project/service";

import {ViewBuildingComponentsFinancialData} from "buildingComponent/container";
import {BuildingComponentsSummaryList} from "buildingComponent/presentational";
import Stack from "@mui/material/Stack";

const ViewBuildingComponentsOverview = () => {
    let project;
    [project] = useOutletContext();

    const [bcMonitorings, setBCMonitorings] = useState(null);

    useEffect(() => {
        if (project)
            ProjectService.getProjectBuildingComponents(project.id).then(data => {
                setBCMonitorings(data);
            });
    }, [project]);

    return project ? (
        <Stack spacing={2}>
            <ViewBuildingComponentsFinancialData filter={{project: project.id}} />
            <BuildingComponentsSummaryList bcMonitorings={bcMonitorings} />
        </Stack>
    ) : null;
};

export default ViewBuildingComponentsOverview;
