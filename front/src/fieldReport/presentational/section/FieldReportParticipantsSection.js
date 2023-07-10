import {FieldReportService} from "fieldReport/service";
import {useMenuGenericDeleteAction} from "base/ui/menu/hooks";
import {AddNewFullWidthButton, BulletList} from "base/shared/components";
import {FieldReportForm} from "../form";

import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

// TO-DO: MOVER EL HANDLESUBMIT AL PADRE
const FieldReportParticipantsSection = ({
    fieldReport,
    isFormOpen,
    onOpenForm,
    onCloseForm,
    onSubmit,
}) => {
    const section = "participants";

    const other_reporting_persons = fieldReport?.other_reporting_persons.map(
        person => `${person.name} (${person.role})`
    );

    const handleOpenForm = () => {
        onOpenForm(section);
    };

    const handleCancelForm = () => {
        onCloseForm(section);
    };

    const handleSubmit = fieldReport => {
        console.log("handleSubmit", fieldReport);
        // FieldReportService.update(fieldReport_view_adapter({...fieldReport}))
        //     .then(() => {
        //         navigate(basePath, true);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         setError(error);
        //     });
    };

    const {dialog: deleteDialog} = useMenuGenericDeleteAction(FieldReportService);

    return (
        <>
            {deleteDialog}
            {isFormOpen ? (
                <FieldReportForm
                    fieldReport={fieldReport}
                    section={section}
                    onSubmit={onSubmit}
                    onCancel={handleCancelForm}
                />
            ) : other_reporting_persons.length ? (
                <Grid container>
                    <Grid item xs>
                        <BulletList items={other_reporting_persons} />
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

export default FieldReportParticipantsSection;
