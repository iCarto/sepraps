import {FieldReportForm} from "../form";
import {FormContainer} from "base/form/components";
import {AddNewFullWidthButton, BulletList} from "base/shared/components";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {UserAuthRequired} from "base/user/utilities";

const FieldReportGoalsSection = ({
    fieldReport,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onSubmit,
}) => {
    const section = "goals";

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
            ) : fieldReport?.goals?.length ? (
                <Grid container columnSpacing={1}>
                    <Grid item xs>
                        <BulletList items={fieldReport?.goals} dense={false} />
                    </Grid>
                    <UserAuthRequired user={fieldReport.created_by}>
                        <Grid
                            item
                            xs={"auto"}
                            container
                            justifyContent="flex-end"
                            alignItems="center"
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
                            tooltip="Añadir objetivo"
                        />
                    </Grid>
                </UserAuthRequired>
            )}
        </>
    );
};

export default FieldReportGoalsSection;
