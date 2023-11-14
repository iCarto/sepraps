import {SectionField} from "base/ui/section/components";
import Grid from "@mui/material/Grid";

const ContractInsuranceSection = ({contract}) => {
    return (
        <Grid container spacing={2}>
            <Grid container item xs={6} direction="column">
                <SectionField
                    label="Seguro de responsabilidad profesional"
                    value={contract?.awarding_professional_liability_insurance_label}
                    containerWidth="long"
                />
                <SectionField
                    label="Seguro de responsabilidad civil"
                    value={contract?.awarding_liability_insurance_label}
                    containerWidth="long"
                />
                <SectionField
                    label="Seguro de accidentes"
                    value={contract?.awarding_accident_insurance_label}
                    containerWidth="long"
                />
            </Grid>
        </Grid>
    );
};

export default ContractInsuranceSection;
