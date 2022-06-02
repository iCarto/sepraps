import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {SubPageLayout} from "layout";
import {
    ContractContractorSection,
    ContractGeneralDataSection,
    ContractFinancingProgramSection,
} from "../presentational/generaldata";
import Grid from "@mui/material/Grid";

const ViewContractInfoSubPage = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    let contract;
    [contract] = useOutletContext();

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    return (
        <SubPageLayout
            outletContext={[contract]}
            getIsSidePanelOpen={getIsSidePanelOpen}
            isSidePanelOpen={isSidePanelOpen}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ContractGeneralDataSection />
                </Grid>
                <Grid item xs={12}>
                    <ContractFinancingProgramSection />
                </Grid>
                <Grid item xs={12}>
                    <ContractContractorSection />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewContractInfoSubPage;
