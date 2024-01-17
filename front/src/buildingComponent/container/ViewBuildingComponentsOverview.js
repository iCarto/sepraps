import {useOutletContext} from "react-router-dom";

import {ViewBuildingComponentsFinancialData} from "buildingComponent/container";
import {BuildingComponentsSummaryList} from "buildingComponent/presentational";
import Stack from "@mui/material/Stack";

const ViewBuildingComponentsOverview = () => {
    const {project, bcMonitorings} = useOutletContext();

    return project && bcMonitorings ? (
        <Stack spacing={2}>
            <ViewBuildingComponentsFinancialData filter={{project: project.id}} />
            <BuildingComponentsSummaryList bcMonitorings={bcMonitorings} />
        </Stack>
    ) : null;
};

export default ViewBuildingComponentsOverview;
