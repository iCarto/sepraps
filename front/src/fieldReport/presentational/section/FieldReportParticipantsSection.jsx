import {AddNewFullWidthButton, BulletList} from "base/shared/components";
import {FormContainer} from "base/form/components";
import {FieldReportForm} from "../form";

import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import {UserAuthRequired} from "base/user/utilities";

const FieldReportParticipantsSection = ({
    fieldReport,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onSubmit,
}) => {
    const section = "participant_persons";

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
            ) : fieldReport?.participant_persons?.length ? (
                <Grid container>
                    <Grid item xs>
                        <BulletList items={fieldReport.participant_persons} />
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
                            tooltip="Añadir otro participante en la intervención"
                        />
                    </Grid>
                </UserAuthRequired>
            )}
        </>
    );
};

export default FieldReportParticipantsSection;
