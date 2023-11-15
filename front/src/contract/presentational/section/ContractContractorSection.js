import {EntityAddButtonGroup} from "base/entity/components/presentational";
import {
    ContractorContactsSection,
    ContractorGeneralDataSection,
} from "contractor/presentational/section";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ContractContractorSection = ({contractor}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ContractorGeneralDataSection contractor={contractor} />
            </Grid>
            <Grid item xs={12}>
                <ContractorContactsSection contractor={contractor} />
            </Grid>
        </Grid>
    );
};

export default ContractContractorSection;
