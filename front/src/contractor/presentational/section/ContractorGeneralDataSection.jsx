import {SectionBox, SectionField} from "base/ui/section/components";

import Grid from "@mui/material/Grid";

const ContractorGeneralDataSection = ({contractor}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <SectionField label="Nombre" value={contractor?.name} />
                <SectionField label="Tipo" value={contractor?.contractor_type_label} />
                <SectionField label="Observaciones" value={contractor?.comments} />
            </Grid>
            <Grid item xs={6}>
                <SectionField label="Dirección" value={contractor?.address} />
                <SectionField label="Celular" value={contractor?.phone} />
                <SectionField label="E-mail" value={contractor?.email} />
            </Grid>
        </Grid>
    );
};

export default ContractorGeneralDataSection;
