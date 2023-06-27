import Grid from "@mui/material/Grid";
import {FormTextArea} from "base/form/components";
import {ContractSearchAutocomplete} from "contract/presentational";
import {ProjectSearchAutocomplete} from "project/presentational/form";

const FieldReportProjectsFormFields = () => {
    const handleSelectContract = contract => {
        console.log("contract", contract);
    };

    const handleSelectProject = contract => {
        console.log("contract", contract);
    };

    return (
        <Grid container columnSpacing={1}>
            <Grid item xs={12} md={6}>
                <ContractSearchAutocomplete handleSelect={handleSelectContract} />
            </Grid>
            <Grid item xs={12} md={6}>
                <ProjectSearchAutocomplete handleSelect={handleSelectProject} />
            </Grid>
            <Grid item xs={12}>
                <FormTextArea name="history" label="Antecedentes" rows={8} />
            </Grid>
            <Grid item xs={12}>
                <FormTextArea name="agreements" label="Acuerdos alcanzados" rows={8} />
            </Grid>
        </Grid>
    );
};

export default FieldReportProjectsFormFields;
