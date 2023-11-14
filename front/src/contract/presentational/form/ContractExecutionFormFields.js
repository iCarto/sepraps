import {useWatch} from "react-hook-form";
import {DateUtil} from "base/format/utilities";
import {FormDatePicker, FormInputInteger} from "base/form/components";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";

const ContractExecutionFormFields = () => {
    const execution_certificate_start_date = useWatch({
        name: "execution_certificate_start_date",
    });

    const expected_execution_period = useWatch({
        name: "expected_execution_period",
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <FormDatePicker
                    name="execution_signature_date"
                    label="Fecha de firma"
                />
                <FormDatePicker
                    name="execution_certificate_start_date"
                    label="Fecha de acta de inicio"
                />
                {expected_execution_period && execution_certificate_start_date && (
                    <FormHelperText sx={{marginLeft: 1, color: "info.main"}}>
                        Fecha prevista de fin de ejecución:{" "}
                        {DateUtil.formatDate(
                            DateUtil.getDateAfterDays(
                                execution_certificate_start_date,
                                expected_execution_period
                            )
                        )}
                    </FormHelperText>
                )}
            </Grid>
        </Grid>
    );
};

export default ContractExecutionFormFields;
