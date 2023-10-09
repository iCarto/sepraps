import {SectionField} from "base/ui/section/components";
import {DateUtil} from "base/format/utilities";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const ViewPaymentDataContent = ({comment}) => {
    return (
        comment && (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <SectionField label="Autor" value={comment.created_by} />
                    </Grid>
                    <Grid item xs={6}>
                        <SectionField
                            label="Fecha"
                            value={DateUtil.formatDateTime(comment.created_at)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SectionField label="Comentario" value={comment.text} />
                    </Grid>
                </Grid>
                <Divider />
            </>
        )
    );
};

export default ViewPaymentDataContent;
