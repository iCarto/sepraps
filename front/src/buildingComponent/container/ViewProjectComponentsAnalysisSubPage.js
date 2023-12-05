import {useOutletContext} from "react-router-dom";

import {SectionCard} from "base/ui/section/components";
import {
    ViewBuildingComponentsFinancialChart,
    ViewBuildingComponentsFinancialData,
} from "buildingComponent/container";
import Grid from "@mui/material/Grid";

const ViewProjectComponentsAnalysisSubPage = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard title="Supervisión de componentes de construcción">
            {project ? (
                <>
                    <Grid width={{xs: "100%", lg: "60%", xl: "50%"}} pt={1} pb={2}>
                        <ViewBuildingComponentsFinancialChart
                            filter={{project: project.id}}
                        />
                    </Grid>
                    <ViewBuildingComponentsFinancialData
                        filter={{project: project.id}}
                    />
                </>
            ) : null}
        </SectionCard>
    );
};

export default ViewProjectComponentsAnalysisSubPage;
