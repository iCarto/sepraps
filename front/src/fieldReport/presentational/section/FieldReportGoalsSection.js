import {useNavigate} from "react-router-dom";

import {useAuth} from "base/user/provider";
import {useMenuGenericDeleteAction} from "base/ui/menu/hooks";
import {FieldReportService} from "fieldReport/service";

import {FieldReportForm} from "../form";
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
    const navigate = useNavigate();
    const {ROLES} = useAuth();

    const section = "goals";

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
                    <AddNewFullWidthButton onClick={handleOpenForm} />
                </Grid>
            )}
        </>
    );
};

export default FieldReportGoalsSection;
