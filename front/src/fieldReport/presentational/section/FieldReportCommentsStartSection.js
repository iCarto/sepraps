import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";

import {AddNewFullWidthButton} from "base/shared/components";
import {FieldReportForm} from "../form";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

const FieldReportCommentsStartSection = ({
    fieldReport,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onSubmit,
}) => {
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const section = "report_comments_start";

    const handleOpenForm = () => {
        onOpenForm(section);
    };

    const handleCancelForm = () => {
        onCloseForm(section);
    };

    return (
        <>
            {isFormOpen ? (
                <FieldReportForm
                    fieldReport={fieldReport}
                    section={section}
                    onSubmit={onSubmit}
                    onCancel={handleCancelForm}
                />
            ) : fieldReport?.[section] ? (
                <Grid container columnSpacing={1}>
                    <Grid item xs>
                        <Typography variant="body1" color="text.primary">
                            {fieldReport[section]}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={"auto"}
                        container
                        justifyContent="flex-end"
                        alignItems="flex-start"
                    >
                        <IconButton onClick={handleOpenForm}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
            ) : (
                <Grid mt={2} display={isFormOpen ? "none" : "inherit"}>
                    <AddNewFullWidthButton
                        onClick={handleOpenForm}
                        tooltip="Añadir texto"
                    />
                </Grid>
            )}
        </>
    );
};

export default FieldReportCommentsStartSection;
