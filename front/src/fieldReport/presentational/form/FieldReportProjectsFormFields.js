import {FormTextArea} from "base/form/components";
import {ContractSearchAutocomplete} from "contract/presentational";
import {ProjectSearchAutocomplete} from "project/presentational/form";
import Grid from "@mui/material/Grid";

const FieldReportProjectsFormFields = ({section}) => {
    const handleSelectContract = contract => {
        console.log("contract", contract);
    };

    const handleSelectProject = contract => {
        console.log("contract", contract);
    };

    const displayHistoryField = !section || section === "history";
    const displayAgreementsField = !section || section === "agreements";

    return (
        <Grid container columnSpacing={1}>
            {!section ? (
                <>
                    <Grid item xs={12} md={6}>
                        <ContractSearchAutocomplete
                            handleSelect={handleSelectContract}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ProjectSearchAutocomplete handleSelect={handleSelectProject} />
                    </Grid>
                </>
            ) : null}
            {displayHistoryField ? (
                <Grid item xs={12}>
                    <FormTextArea name="history" label="Antecedentes" rows={8} />
                </Grid>
            ) : null}
            {displayAgreementsField ? (
                <Grid item xs={12}>
                    <FormTextArea
                        name="agreements"
                        label="Acuerdos alcanzados"
                        rows={8}
                    />
                </Grid>
            ) : null}
        </Grid>
    );
};

export default FieldReportProjectsFormFields;
