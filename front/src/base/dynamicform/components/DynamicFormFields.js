import {Fragment} from "react";
import {DynamicFieldUtil, DynamicFormUtil} from "base/dynamicform/utilities";
import Grid from "@mui/material/Grid";

const DynamicFormFields = ({attributes, columns = 2}) => {
    return (
        <Grid container columnSpacing={1}>
            {Object.entries(DynamicFieldUtil.getOrderedAttributes(attributes)).map(
                ([attributeName, attributeSchema], index) => {
                    // TO-DO: Find a better solution for this
                    // Force empty grid item to move Coordenada X to first column
                    if (DynamicFieldUtil.shouldBeInFirstColumn(attributeName, index)) {
                        return (
                            <Fragment key={attributeName}>
                                <Grid item xs={12 / columns}></Grid>
                                <Grid item xs={12 / columns}>
                                    {DynamicFormUtil.getFormField(
                                        attributeName,
                                        attributeSchema
                                    )}
                                </Grid>
                            </Fragment>
                        );
                    } else
                        return (
                            <Grid item xs={12 / columns} key={attributeName}>
                                {DynamicFormUtil.getFormField(
                                    attributeName,
                                    attributeSchema
                                )}
                            </Grid>
                        );
                }
            )}
        </Grid>
    );
};

export default DynamicFormFields;
