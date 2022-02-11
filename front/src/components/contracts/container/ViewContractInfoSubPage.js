import {
    ContractAwardingSection,
    ContractBidRequestSection,
    ContractExecutionSection,
    ContractGeneralDataSection,
} from "../presentational/generaldata";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const ViewContractInfoSubPage = () => {
    return (
        <Container maxWidth="lg" sx={{my: 3}}>
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
                    <ContractExecutionSection />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ViewContractInfoSubPage;
