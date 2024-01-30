import {useOutletContext} from "react-router-dom";

import {ViewBuildingComponentsFinancialData} from "buildingComponent/container";
import {BuildingComponentsSummaryList} from "buildingComponent/presentational";
import Grid from "@mui/material/Grid";
import {PaperComponent} from "base/shared/components";

const ViewBuildingComponentsOverview = () => {
    const {project, bcMonitorings} = useOutletContext();

    return project && bcMonitorings ? (
        <Grid container spacing={1}>
            <Grid item xs={5}>
                <PaperComponent>
                    <ViewBuildingComponentsFinancialData
                        filter={{project: project.id}}
                    />
                </PaperComponent>
            </Grid>
            <Grid item xs={7}>
                <PaperComponent>
                    <BuildingComponentsSummaryList bcMonitorings={bcMonitorings} />
                </PaperComponent>
            </Grid>
        </Grid>
    ) : null;
};

export default ViewBuildingComponentsOverview;
