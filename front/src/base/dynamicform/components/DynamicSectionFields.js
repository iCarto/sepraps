import Grid from "@mui/material/Grid";
import {FieldUtil} from "base/ui/section/utilities";
import {DynamicFieldUtil} from "../utilities";

const DynamicSectionFields = ({attributes, columns = 2}) => {
    return (
        <Grid container spacing={2}>
            {Object.entries(attributes).map(([attributeName, attributeSchema]) => (
                <Grid item xs={12 / columns} key={attributeName}>
                    {DynamicFieldUtil.getSectionField(attributeName, attributeSchema)}
                </Grid>
            ))}
        </Grid>
    );
};

export default DynamicSectionFields;
