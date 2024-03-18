import {useOutletContext} from "react-router-dom";

import {ViewBuildingComponentsFinancialData} from "buildingComponent/container";
import {
    BuildingComponentsProgress,
    BuildingComponentsSummaryList,
} from "buildingComponent/presentational";
import {PaperComponent} from "base/shared/components";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

const ViewBuildingComponentsOverview = () => {
    const {project, bcMonitorings} = useOutletContext();

    return project && bcMonitorings ? (
        <Grid container spacing={1}>
            <Grid item xs={6} sx={{height: "fit-content"}}>
                <PaperComponent>
                    <Stack spacing={2}>
                        <BuildingComponentsProgress
                            progressData={{
                                financial_progress_percentage:
                                    project.financial_progress_percentage,
                                physical_progress_percentage:
                                    project.physical_progress_percentage,
                            }}
                        />
                        <ViewBuildingComponentsFinancialData
                            filter={{project: project.id}}
                        />
                    </Stack>
                </PaperComponent>
            </Grid>
            <Grid item xs={6}>
                <PaperComponent>
                    <BuildingComponentsSummaryList bcMonitorings={bcMonitorings} />
                </PaperComponent>
            </Grid>
        </Grid>
    ) : null;
};

export default ViewBuildingComponentsOverview;
