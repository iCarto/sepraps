import {SectionSubheading} from "base/ui/section/components";
import {FormList} from "base/form/components";

import Grid from "@mui/material/Grid";

const FieldReportProjectFormAgreementsFields = ({
    name: propsName,
    isEditFormSection = false,
}) => {
    return (
        <Grid container spacing={1} mt={1}>
            {isEditFormSection ? null : (
                <Grid item>
                    <SectionSubheading
                        heading="Acuerdos alcanzados"
                        style={{mb: 0, ml: 1.5}}
                    />
                </Grid>
            )}
            <Grid item xs={12}>
                <FormList name={propsName} itemName="Acuerdo" />
            </Grid>
        </Grid>
    );
};

export default FieldReportProjectFormAgreementsFields;
