import {useNavigate} from "react-router-dom";

import {
    SectionCard,
    SectionCardHeaderAction,
    SectionField,
} from "components/common/presentational";
import {DateUtil} from "utilities";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

const QuestionnaireInstanceDetail = ({instance}) => {
    const navigate = useNavigate();

    const secondaryActions = [
        <SectionCardHeaderAction
            key="edit"
            name="edit"
            text="Modificar"
            icon={<EditIcon />}
            onClick={() => {
                navigate("edit");
            }}
        />,
    ];

    const fecha = DateUtil.getMonthName(instance.month) + " / " + instance.year;
    return (
        instance && (
            <SectionCard title={fecha} secondaryActions={secondaryActions}>
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
            </SectionCard>
        )
    );
};

export default QuestionnaireInstanceDetail;
