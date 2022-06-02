import {Fragment} from "react";
import {FormDatePicker, FormInputInteger} from "components/common/form";

const ContractExecutionFormFields = () => {
    return (
        <Fragment>
            <FormDatePicker name="execution_signature_date" label="Fecha de firma" />
            <FormDatePicker
                name="execution_certificate_start_date"
                label="Fecha de acta de inicio"
            />
            <FormDatePicker
                name="execution_final_delivery_date"
                label="Fecha de recepción definitiva"
            />
            <FormInputInteger
                name="expected_execution_period"
                label="Plazo previsto"
                endAdornment="días"
                rules={{required: "El campo es obligatorio"}}
            />
            {/*<FormDatePicker
                name="execution_order_start_date"
                label="Fecha de orden de inicio"
            />

            <FormDatePicker
                name="execution_expected_delivery_date"
                label="Fecha de recepción provisoria"
            />
            */}
        </Fragment>
    );
};

export default ContractExecutionFormFields;
