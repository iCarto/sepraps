import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {useNavigateWithReload} from "hooks";
import {createMilestone, milestone_view_adapter} from "model";
import {MilestoneService} from "service/api";

import {SidebarPanel} from "layout";
import {MilestoneFormFields} from "../presentational";
import {AlertError} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
                setError(error);
            });
    };

    const handleCloseSidebar = () => {
        navigate(`/projects/${project.id}/milestones`);
    };

    return (
        <SidebarPanel
            sidebarTitle="Confirmar fecha de cumplimiento"
            closeSidebarClick={handleCloseSidebar}
        >
            <FormProvider {...formMethods}>
                <Box
                    component="form"
                    sx={{
                        width: "100%",
                    }}
                >
                    <AlertError error={error} />
                    <Typography sx={{fontWeight: "medium"}}>
                        {milestone?.category_name}
                    </Typography>
                    <MilestoneFormFields />
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        <Button
                            variant="contained"
                            color="primary"
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
