import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {useNavigateWithReload} from "hooks";
import {createMilestone, milestone_view_adapter} from "model";
import {MilestoneService} from "service/api";

import {SidebarPanel} from "layout";
import {MilestoneFormFields} from "../presentational";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UpdateMilestonePanel = () => {
    const {milestoneId} = useParams();
    let project;
    [project] = useOutletContext();

    const [milestone, setMilestone] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    const formMethods = useForm({
        defaultValues: {
            compliance_date: "",
        },
        reValidateMode: "onSubmit",
    });

    useEffect(() => {
        MilestoneService.getMilestone(milestoneId).then(milestone => {
            console.log({milestone});
            setMilestone(milestone);
        });
    }, [milestoneId]);

    useEffect(() => {
        if (milestone) {
            formMethods.reset({
                compliance_date: milestone.compliance_date,
            });
        }
    }, [milestone]);

    const onSubmit = data => {
        const updatedMilestone = createMilestone(
            milestone_view_adapter({
                ...milestone,
                compliance_date: data.compliance_date,
            })
        );
        handleFormSubmit(updatedMilestone);
    };

    const handleFormSubmit = milestone => {
        MilestoneService.updateMilestone(milestone)
            .then(() => {
                navigate(`/projects/${project.id}/milestones`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleCancel = () => {
        navigate(`/projects/${project.id}/milestones`);
    };

    return (
        <SidebarPanel>
            <FormProvider {...formMethods}>
                <Box component="form">
                    <Grid container>
                        <Grid item xs={12} sx={{mb: 2}}>
                            <Typography variant="h6" color="primary">
                                {milestone?.category_name}
                            </Typography>
                        </Grid>
                        {/* {error && (
                                <Alert severity="error">
                                    {error} sx={{mb: 2}}
                                </Alert>
                            )} */}
                        <Grid item container justifyContent="center" xs={12}>
                            <MilestoneFormFields />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        <Button color="inherit" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ml: 2}}
                            onClick={formMethods.handleSubmit(onSubmit)}
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Box>
            </FormProvider>
        </SidebarPanel>
    );
};

export default UpdateMilestonePanel;
