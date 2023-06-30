import {useState} from "react";

import {AddNewButtonFullWidthButton} from "base/shared/components";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {FieldReportProjectsForm} from "../form";

const FieldReportProjectHistorySection = ({project}) => {
    const [displayFormNew, setDisplayFormNew] = useState(false);
    const [displayFormEdit, setDisplayFormEdit] = useState(false);

    const handleClickEdit = () => {
        setDisplayFormNew(false);
        setDisplayFormEdit(true);
    };

    const handleCancelForm = () => {
        setDisplayFormNew(false);
        setDisplayFormEdit(false);
    };

    // TO-DO: In FieldReportProjectsForm, show only the part of the form that is needed (antecedentes/acuerdos alcanzados) - Implementar botón para añadir antecedentes/acuerdos alcanzados

    return (
        <>
            {displayFormEdit ? (
                <FieldReportProjectsForm onSubmit={undefined} project={project} />
            ) : (
                <Grid container columnSpacing={1}>
                    <Grid item xs>
                        <Typography variant="body1" color="text.primary">
                            {project.history}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={"auto"}
                        container
                        justifyContent="flex-end"
                        alignItems="flex-start"
                    >
                        <IconButton onClick={handleClickEdit}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default FieldReportProjectHistorySection;
