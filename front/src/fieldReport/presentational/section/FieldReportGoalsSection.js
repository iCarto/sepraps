import {FieldReportForm} from "../form";
import {FormContainer} from "base/form/components";
import {AddNewFullWidthButton, BulletList} from "base/shared/components";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

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
                </Grid>
            ) : (
                <Grid mt={2} display={isFormOpen ? "none" : "inherit"}>
                    <AddNewFullWidthButton
                        onClick={handleOpenForm}
                        tooltip="Añadir objetivo"
                    />
                </Grid>
            )}
        </>
    );
};

export default FieldReportGoalsSection;
