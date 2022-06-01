import {SectionField} from "components/common/presentational";
import Paper from "@mui/material/Paper";
import {DateUtil} from "utilities";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const QuestionnaireInstanceDetail = ({instance}) => {
    return (
        instance && (
            <Paper elevation={2} sx={{p: 3}}>
                <SectionField
                    label="Fecha:"
                    value={
                        DateUtil.getMonthName(instance.month) + " / " + instance.year
                    }
                />
                <SectionField label="Observaciones:" value={instance.comments} />
                <Divider sx={{mb: 3}} />
                {instance.values.map(fieldValue => (
                    <Grid key={fieldValue.code} container spacing={3}>
                        <Grid item sm={5}>
                            <Typography variant="subtitle1" color="text.secondary">
                                {fieldValue.label}:
                            </Typography>
                        </Grid>
                        <Grid item sm={7}>
                            <Typography component="span">{fieldValue.value}</Typography>
                            {fieldValue.expected_value && (
                                <Typography
                                    component="span"
                                    sx={{ml: 1, color: "grey.500", fontStyle: "italic"}}
                                >
                                    (Previsto: {fieldValue.expected_value})
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                ))}
            </Paper>
        )
    );
};

export default QuestionnaireInstanceDetail;
