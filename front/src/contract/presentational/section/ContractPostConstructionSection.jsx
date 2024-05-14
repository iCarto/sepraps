import {DateUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";

import Grid from "@mui/material/Grid";

const ContractPostConstructionSection = ({contract}) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                {FieldUtil.getSectionField(
                    "Fin del periodo de garantía",
                    DateUtil.formatDate(contract?.warranty_end_date)
                )}
            </Grid>
        </Grid>
    );
};

export default ContractPostConstructionSection;
