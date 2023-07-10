import {FieldReportForm} from "../form";
import {AddNewFullWidthButton, BulletList} from "base/shared/components";

import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

const FieldReportReportedPersonsSection = ({
    fieldReport,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onSubmit,
}) => {
    const reported_persons = fieldReport?.reported_persons.map(
        person => `${person.name} (${person.role})`
    );

    const section = "reported_persons";

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
            ) : reported_persons.length ? (
                <Grid container>
                    <Grid item xs>
                        <BulletList items={reported_persons} />
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
                    <AddNewFullWidthButton onClick={handleOpenForm} />
                </Grid>
            )}
        </>
    );
};

export default FieldReportReportedPersonsSection;
