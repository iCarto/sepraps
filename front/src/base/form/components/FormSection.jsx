import {PaperContainer} from "base/shared/components";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const FormSection = ({title = "", ...props}) => {
    return (
        <PaperContainer>
            <Grid item xs={12} mb={2}>
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
            </Grid>
            <Grid
                item
                container
                justifyContent="flex-start"
                alignItems="center"
                xs={12}
            >
                {props.children}
            </Grid>
        </PaperContainer>
    );
};

export default FormSection;
