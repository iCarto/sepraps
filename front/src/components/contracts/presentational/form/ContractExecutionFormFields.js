import {useWatch} from "react-hook-form";
import {DateUtil} from "utilities";
import {FormDatePicker, FormInputInteger} from "components/common/form";
import FormHelperText from "@mui/material/FormHelperText";

const ContractExecutionFormFields = () => {
    const execution_certificate_start_date = useWatch({
        name: "execution_certificate_start_date",
    });

    const expected_execution_period = useWatch({
        name: "expected_execution_period",
    });

    return (
        <>
            <FormDatePicker name="execution_signature_date" label="Fecha de firma" />
            <FormDatePicker
                name="execution_certificate_start_date"
                label="Fecha de acta de inicio"
            />
            <FormInputInteger
                name="expected_execution_period"
                label="Plazo previsto de ejecución"
                endAdornment="días"
                // rules={{required: "El campo es obligatorio"}}
            />
            {expected_execution_period && (
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
            <FormDatePicker
                name="execution_final_delivery_date"
                label="Fecha de recepción definitiva"
            />
        </>
    );
};

export default ContractExecutionFormFields;
