import {DynamicFieldUtil, DynamicFormUtil} from "base/dynamicform/utilities";
import Grid from "@mui/material/Grid";

const DynamicFormFields = ({attributes, columns = 2}) => {
    return (
        <Grid container columnSpacing={1}>
            {Object.entries(DynamicFieldUtil.getOrderedAttributes(attributes)).map(
                ([attributeName, attributeSchema]) => (
                    <Grid item xs={12 / columns} key={attributeName}>
                        {DynamicFormUtil.getFormField(attributeName, attributeSchema)}
                    </Grid>
                )
            )}
        </Grid>
    );
};

export default DynamicFormFields;
