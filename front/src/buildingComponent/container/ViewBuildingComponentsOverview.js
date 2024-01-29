import {useOutletContext} from "react-router-dom";

import {ViewBuildingComponentsFinancialData} from "buildingComponent/container";
import {BuildingComponentsSummaryList} from "buildingComponent/presentational";
import Grid from "@mui/material/Grid";

const ViewBuildingComponentsOverview = () => {
    const {project, bcMonitorings} = useOutletContext();

    return project && bcMonitorings ? (
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <ViewBuildingComponentsFinancialData filter={{project: project.id}} />
            </Grid>
            <Grid item xs={7}>
                <BuildingComponentsSummaryList bcMonitorings={bcMonitorings} />
            </Grid>
        </Grid>
    ) : null;
};

export default ViewBuildingComponentsOverview;
