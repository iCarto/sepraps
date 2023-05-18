import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";

import {MilestoneService} from "milestone/service";
import {createMilestone} from "milestone/model";

import {MilestoneFormFields} from "milestone/presentational";
import {SectionHeading} from "base/ui/section/components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MilestoneForm = ({onSubmit}) => {
    const {milestoneId} = useParams();

    const [milestone, setMilestone] = useState(null);
    const [allItemsChecked, setAllItemsChecked] = useState(false);

    const formMethods = useForm({
        defaultValues: {
            compliance_date: "",
            comments: "",
        },
        reValidateMode: "onSubmit",
    });

    useEffect(() => {
        MilestoneService.get(milestoneId).then(milestone => {
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

    const handleFormSubmit = data => {
        const updatedMilestone = createMilestone({
            ...milestone,
            compliance_date: data.compliance_date,
            comments: data.comments,
        });
        onSubmit(updatedMilestone);
    };

    const handleChecklist = checklist => {
        setAllItemsChecked(checklist);
    };

    const checklistItems = milestone?.checklist.map(
        checklistItem => checklistItem["definition"]
    );

    return (
        <FormProvider {...formMethods}>
            <Box
                component="form"
                sx={{
                    width: "100%",
                }}
            >
                <SectionHeading label={false}>{milestone?.name}</SectionHeading>
                <Typography variant="body2" py={1}>
                    Antes de confirmar la fecha de cumplimiento de este hito, por favor
                    realice las siguientes comprobaciones:
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
                        onClick={formMethods.handleSubmit(handleFormSubmit)}
                        disabled={!allItemsChecked}
                    >
                        Guardar
                    </Button>
                </Grid>
            </Box>
        </FormProvider>
    );
};

export default MilestoneForm;
