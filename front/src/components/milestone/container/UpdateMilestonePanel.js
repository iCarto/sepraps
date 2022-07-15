import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {useNavigateWithReload} from "hooks";
import {createMilestone, milestone_view_adapter} from "model";
import {MilestoneService} from "service/api";

import {SidebarPanel} from "layout";
import {MilestoneFormFields} from "../presentational";
import {AlertError, SectionHeading} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const UpdateMilestonePanel = () => {
    const {milestoneId} = useParams();
    let project;
    [project] = useOutletContext();

    const [milestone, setMilestone] = useState(null);
    const [allItemsChecked, setAllItemsChecked] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    const formMethods = useForm({
        defaultValues: {
            compliance_date: "",
            comments: "",
        },
        reValidateMode: "onSubmit",
    });

    useEffect(() => {
        MilestoneService.getMilestone(milestoneId).then(milestone => {
            setMilestone(milestone);
        });
    }, [milestoneId]);

    useEffect(() => {
        if (milestone) {
            formMethods.reset({
                compliance_date: milestone.compliance_date || "",
                comments: milestone.comments || "",
            });
        }
    }, [milestone]);

    const onSubmit = data => {
        const updatedMilestone = createMilestone(
            milestone_view_adapter({
                ...milestone,
                compliance_date: data.compliance_date,
                comments: data.comments,
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

    const handleChecklist = checklist => {
        setAllItemsChecked(checklist);
    };

    const checklistItems = milestone?.checklist.map(
        checklistItem => checklistItem["definition"]
    );

    return (
        <SidebarPanel
            sidebarTitle="Fecha de cumplimiento"
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
                    <SectionHeading label={false}>{milestone?.name}</SectionHeading>
                    <Typography variant="body2" py={3}>
                        Antes de confirmar la fecha de cumplimiento de este hito, por
                        favor realice las siguientes comprobaciones:
                    </Typography>
                    <MilestoneFormFields
                        checklistItems={checklistItems}
                        handleChecklist={handleChecklist}
                        areAllItemsChecked={allItemsChecked}
                    />
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={formMethods.handleSubmit(onSubmit)}
                            disabled={!allItemsChecked}
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
