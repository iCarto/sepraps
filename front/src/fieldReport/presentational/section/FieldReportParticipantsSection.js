import {AddNewFullWidthButton, BulletList} from "base/shared/components";
import {FieldReportForm} from "../form";

import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

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
                <FieldReportForm
                    fieldReport={fieldReport}
                    section={section}
                    onSubmit={onSubmit}
                    onCancel={handleCancelForm}
                />
            ) : fieldReport?.participant_persons?.length ? (
                <Grid container>
                    <Grid item xs>
                        <BulletList items={fieldReport.participant_persons} />
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
                        tooltip="Añadir participante"
                    />
                </Grid>
            )}
        </>
    );
};

export default FieldReportParticipantsSection;
