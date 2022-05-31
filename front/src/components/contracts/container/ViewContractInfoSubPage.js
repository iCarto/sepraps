import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {SubPageLayout} from "layout";
import {
    ContractAwardingSection,
    ContractBidRequestSection,
    ContractContractorSection,
    ContractExecutionSection,
    ContractGeneralDataSection,
    ContractFinancingProgramSection,
    ContractPostConstructionSection,
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
                    <ContractGeneralDataSection isSidePanelOpen={isSidePanelOpen} />
                </Grid>
                <Grid item xs={12}>
                    <ContractFinancingProgramSection
                        isSidePanelOpen={isSidePanelOpen}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractBidRequestSection isSidePanelOpen={isSidePanelOpen} />
                </Grid>
                <Grid item xs={12}>
                    <ContractAwardingSection isSidePanelOpen={isSidePanelOpen} />
                </Grid>
                <Grid item xs={12}>
                    <ContractContractorSection isSidePanelOpen={isSidePanelOpen} />
                </Grid>
                <Grid item xs={12}>
                    <ContractExecutionSection isSidePanelOpen={isSidePanelOpen} />
                </Grid>
                <Grid item xs={12}>
                    <ContractPostConstructionSection
                        isSidePanelOpen={isSidePanelOpen}
                    />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewContractInfoSubPage;
