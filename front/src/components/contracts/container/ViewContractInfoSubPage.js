import {useOutletContext} from "react-router-dom";
import {SubPageLayout} from "layout";
import {
    ContractAwardingSection,
    ContractBidRequestSection,
    ContractContractorSection,
    ContractExecutionSection,
    ContractGeneralDataSection,
} from "../presentational/generaldata";
import Grid from "@mui/material/Grid";

const ViewContractInfoSubPage = () => {
    let contract;
    [contract] = useOutletContext();

    return (
        <SubPageLayout outletContext={[contract]}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ContractGeneralDataSection />
                </Grid>
                <Grid item xs={12}>
                    <ContractBidRequestSection />
                </Grid>
                <Grid item xs={12}>
                    <ContractAwardingSection />
                </Grid>
                <Grid item xs={12}>
                    <ContractContractorSection />
                </Grid>
                <Grid item xs={12}>
                    <ContractExecutionSection />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewContractInfoSubPage;
