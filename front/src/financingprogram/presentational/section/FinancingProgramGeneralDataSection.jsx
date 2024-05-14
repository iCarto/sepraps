import {SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";

const FinancingProgramGeneralDataSection = ({financingprogram}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <SectionField
                    label="Nombre corto"
                    value={financingprogram?.short_name}
                />
                <SectionField label="Nombre" value={financingprogram?.name} />
            </Grid>
            <Grid item xs={6}>
                <SectionField
                    label="Financiador/es"
                    value={financingprogram?.financing_funds
                        .map(financing_fund => financing_fund.name)
                        .join(", ")}
                />
            </Grid>
        </Grid>
    );
};

export default FinancingProgramGeneralDataSection;
