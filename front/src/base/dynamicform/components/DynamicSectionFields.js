import {DynamicFieldUtil} from "../utilities";
import Grid from "@mui/material/Grid";

const DynamicSectionFields = ({attributes, columns = 2}) => {
    return (
        <Grid container columnSpacing={2}>
            {Object.entries(attributes).map(([attributeName, attributeSchema]) => (
                <Grid item xs={12 / columns} key={attributeName}>
                    {DynamicFieldUtil.getSectionField(attributeName, attributeSchema)}
                </Grid>
            ))}
        </Grid>
    );
};

export default DynamicSectionFields;
