import {FormSelect} from "base/form/components";
import {useDomain} from "sepraps/domain/provider";
import Grid from "@mui/material/Grid";

const ContractInsuranceFormFields = () => {
    const {yesNoDomain} = useDomain();

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormSelect
                    name="awarding_professional_liability_insurance"
                    label="Seguro de responsabilidad profesional"
                    options={yesNoDomain}
                />
                <FormSelect
                    name="awarding_liability_insurance"
                    label="Seguro de responsabilidad civil"
                    options={yesNoDomain}
                />
            </Grid>
            <Grid item xs={6}>
                <FormSelect
                    name="awarding_accident_insurance"
                    label="Seguro de accidentes"
                    options={yesNoDomain}
                />
            </Grid>
        </Grid>
    );
};

export default ContractInsuranceFormFields;
