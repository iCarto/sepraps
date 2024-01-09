import {useOutletContext} from "react-router-dom";

import {SectionCard} from "base/ui/section/components";
import {
    ViewBuildingComponentsFinancialChart,
    ViewBuildingComponentsFinancialData,
} from "buildingComponent/container";
import Grid from "@mui/material/Grid";

const ViewContractProjectAnalysisSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    return (
        <SectionCard title="Supervisión de componentes de construcción">
            {contract ? (
                <>
                    <Grid width={{xs: "100%", lg: "80%", xl: "75%"}} pt={1} pb={2}>
                        <ViewBuildingComponentsFinancialChart
                            filter={{contract: contract.id}}
                        />
                    </Grid>
                    <ViewBuildingComponentsFinancialData
                        filter={{contract: contract.id}}
                    />
                </>
            ) : null}
        </SectionCard>
    );
};

export default ViewContractProjectAnalysisSubPage;
