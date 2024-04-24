import {FormDatePicker, FormInputText, FormSelect} from "base/form/components";
import Grid from "@mui/material/Grid";
import {useDomain} from "sepraps/domain/provider";

const PaymentFormDataFields = () => {
    const {deliverableStatus} = useDomain();

    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} direction="column">
                <FormInputText
                    name="name"
                    label="Nombre del entregable"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormSelect
                    name="status"
                    label="Estado"
                    options={deliverableStatus}
                    showEmptyOption={true}
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
            <Grid container item xs={6} direction="column">
                <FormDatePicker
                    name="product_date"
                    label="Fecha de entrega"
                    rules={{required: "Este campo es obligatorio"}}
                />
            </Grid>
        </Grid>
    );
};

export default PaymentFormDataFields;
