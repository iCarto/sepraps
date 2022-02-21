import {useOutletContext} from "react-router-dom";
import {SubPageLayout} from "layout";
import {
    ContractAwardingSection,
    ContractBidRequestSection,
    ContractExecutionSection,
    ContractGeneralDataSection,
} from "../presentational/generaldata";
import {ContractorSection} from "components/contractor/presentational";
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
                    <ContractorSection contractor={contract.contractor} />
                </Grid>
                <Grid item xs={12}>
                    <ContractExecutionSection />
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewContractInfoSubPage;
