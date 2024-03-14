import {
    ContractorContactsSection,
    ContractorGeneralDataSection,
} from "contractor/presentational/section";

import Grid from "@mui/material/Grid";

const ContractContractorSection = ({contractor}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ContractorGeneralDataSection contractor={contractor} />
            </Grid>
            <Grid item xs={12}>
                <ContractorContactsSection contractorId={contractor.id} />
            </Grid>
        </Grid>
    );
};

export default ContractContractorSection;
