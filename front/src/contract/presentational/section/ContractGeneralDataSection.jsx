import {SectionField} from "base/ui/section/components";
import {ContractServiceChips} from "..";

import Grid from "@mui/material/Grid";

const ContractGeneralDataSection = ({contract}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <SectionField label="Número" value={contract?.number} />
                <SectionField
                    label="Servicios prestados"
                    value={
                        <ContractServiceChips serviceLabels={contract.services_label} />
                    }
                />
            </Grid>
            <Grid item xs={6}>
                <SectionField label="Descripción" value={contract?.comments} />
            </Grid>
        </Grid>
    );
};

export default ContractGeneralDataSection;
