import {AddNewFullWidthButton} from "base/shared/components";
import {FormContainer} from "base/form/components";
import {FieldReportForm} from "../form";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {UserAuthRequired} from "base/user/utilities";

const FieldReportCommentsStartSection = ({
    fieldReport,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onSubmit,
}) => {
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
                <FormContainer>
                    <FieldReportForm
                        fieldReport={fieldReport}
                        section={section}
                        onSubmit={onSubmit}
                        onCancel={handleCancelForm}
                    />
                </FormContainer>
            ) : fieldReport?.[section] ? (
                <Grid container columnSpacing={1}>
                    <Grid item xs>
                        <Typography variant="body1" color="text.primary">
                            {fieldReport[section]}
                        </Typography>
                    </Grid>
                    <UserAuthRequired user={fieldReport.created_by}>
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
                    </UserAuthRequired>
                </Grid>
            ) : (
                <UserAuthRequired user={fieldReport.created_by}>
                    <Grid mt={2} display={isFormOpen ? "none" : "inherit"}>
                        <AddNewFullWidthButton
                            onClick={handleOpenForm}
                            tooltip="Añadir texto"
                        />
                    </Grid>
                </UserAuthRequired>
            )}
        </>
    );
};

export default FieldReportCommentsStartSection;
