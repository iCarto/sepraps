import {SectionField} from "base/ui/section/components";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

const ContractGeneralDataSection = ({contract}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <SectionField label="Número" value={contract?.number} />
                <SectionField
                    label="Servicios prestados"
                    value={contract.services_label.split(",").map(service => (
                        <Chip
                            key={service}
                            size="small"
                            label={service}
                            sx={{mr: 1, border: 1, borderColor: "grey.400"}}
                        />
                    ))}
                />
            </Grid>
            <Grid item xs={6}>
                <SectionField label="Descripción" value={contract?.comments} />
            </Grid>
        </Grid>
    );
};

export default ContractGeneralDataSection;
