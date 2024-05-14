import {Fragment} from "react";
import {DynamicFieldUtil} from "../utilities";
import Grid from "@mui/material/Grid";

const DynamicSectionFields = ({attributes, columns = 2}) => {
    return (
        <Grid container columnSpacing={2}>
            {Object.entries(DynamicFieldUtil.getOrderedAttributes(attributes)).map(
                ([attributeName, attributeSchema], index) => {
                    // TO-DO: Find a better solution for this
                    // Force empty grid item to move Coordenada X to first column
                    if (DynamicFieldUtil.shouldBeInFirstColumn(attributeName, index)) {
                        return (
                            <Fragment key={attributeName}>
                                <Grid item xs={12 / columns}></Grid>
                                <Grid item xs={12 / columns}>
                                    {DynamicFieldUtil.getSectionField(
                                        attributeName,
                                        attributeSchema
                                    )}
                                </Grid>
                            </Fragment>
                        );
                    } else
                        return (
                            <Grid item xs={12 / columns} key={attributeName}>
                                {DynamicFieldUtil.getSectionField(
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

export default DynamicSectionFields;
