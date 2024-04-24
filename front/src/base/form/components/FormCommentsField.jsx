import Grid from "@mui/material/Grid";
import FormTextArea from "./FormTextArea";

const FormCommentsField = ({placeholder = ""}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormTextArea
                    name="comments"
                    label="Observaciones"
                    maxLength={255}
                    placeholder={placeholder}
                />
            </Grid>
        </Grid>
    );
};

export default FormCommentsField;
