import {useWatch} from "react-hook-form";
import {DateUtil} from "base/format/utilities";
import {FormDatePicker} from "base/form/components";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import {ContractServiceUtil} from "contract/utilities";

const ContractExecutionFormFields = ({services = null}) => {
    const execution_start_date = useWatch({
        name: "execution_start_date",
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
                    name="execution_start_date"
                    label={ContractServiceUtil.getExecutionStartDateLabel(services)}
                />
                {expected_execution_period && execution_start_date && (
                    <FormHelperText sx={{marginLeft: 1, color: "info.main"}}>
                        Fecha prevista de fin de ejecución:{" "}
                        {DateUtil.formatDate(
                            DateUtil.getDateAfterDays(
                                execution_start_date,
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
