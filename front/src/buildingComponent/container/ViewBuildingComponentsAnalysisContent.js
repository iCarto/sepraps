import {useOutletContext} from "react-router-dom";

import {SectionCard} from "base/ui/section/components";
import {ViewBuildingComponentsFinancialChart} from "buildingComponent/container";
import Grid from "@mui/material/Grid";

const ViewBuildingComponentsAnalysisContent = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard title="Supervisión de componentes de construcción">
            {project ? (
                <>
                    <Grid width={{xs: "100%", lg: "80%", xl: "75%"}} pt={1} pb={2}>
                        <ViewBuildingComponentsFinancialChart
                            filter={{project: project.id}}
                        />
                    </Grid>
                </>
            ) : null}
        </SectionCard>
    );
};

export default ViewBuildingComponentsAnalysisContent;
