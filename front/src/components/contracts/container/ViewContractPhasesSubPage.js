import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {SubPageLayout} from "layout";
import {
    ContractAwardingSection,
    ContractBidRequestSection,
    ContractExecutionSection,
    ContractPostConstructionSection,
} from "../presentational/generaldata";
import Grid from "@mui/material/Grid";

const ViewContractPhasesSubPage = () => {
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
                    <ContractBidRequestSection />
                </Grid>
                <Grid item xs={12}>
                    <ContractAwardingSection />
                </Grid>
                <Grid item xs={12}>
                    <ContractExecutionSection />
                </Grid>
                <Grid item xs={12}>
                    <ContractPostConstructionSection />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewContractPhasesSubPage;
