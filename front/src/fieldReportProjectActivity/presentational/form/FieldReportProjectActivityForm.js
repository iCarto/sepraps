import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";

import {EntityForm} from "base/entity/components/form";
import {FormContainer} from "base/form/components";
import {FieldReportProjectActivityFormFields} from ".";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useState} from "react";

const FieldReportProjectActivityForm = ({activity = null, onSubmit, onCancel}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const defaultFormValues = {
        id: FormUtil.getFormValue(activity?.id),
        text: FormUtil.getFormValue(activity?.text),
        title: FormUtil.getFormValue(activity?.title),
        date: FormUtil.getFormValue(activity?.date),
        notes: FormUtil.getFormValue(activity?.notes),
        image1: FormUtil.getFormValue(activity?.image1),
        image2: FormUtil.getFormValue(activity?.image2),
        image3: FormUtil.getFormValue(activity?.image3),
        image4: FormUtil.getFormValue(activity?.image4),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const handleCancel = () => {
        formMethods.reset({
            id: null,
            text: "",
            title: "",
            date: null,
            notes: "",
            image1: null,
            image2: null,
            image3: null,
            image4: null,
        });
        onCancel();
    };

    const onFormSubmit = data => {
        setIsSubmitting(true);
        const updatedActivity = {
            id: FormUtil.getDataValue(data.id),
            text: FormUtil.getDataValue(data.text),
            title: FormUtil.getDataValue(data.title),
            date: FormUtil.getDataValue(data.date),
            notes: FormUtil.getDataValue(data.notes),
            image1: FormUtil.getDataValue(data.image1),
            image2: FormUtil.getDataValue(data.image2),
            image3: FormUtil.getDataValue(data.image3),
            image4: FormUtil.getDataValue(data.image4),
        };
        onSubmit(updatedActivity, success => {
            setIsSubmitting(false);
        });
    };

    return (
        <FormProvider {...formMethods}>
            <FormContainer>
                <Grid item>
                    <Typography
                        variant="h6"
                        component="h4"
                        sx={{
                            pl: 1,
                            pb: 3,
                            color: "primary.main",
                            fontWeight: "500",
                        }}
                    >
                        {activity ? "Editar actividad" : "Añadir actividad"}
                    </Typography>
                </Grid>
                <Grid item>
                    <EntityForm
                        isSubmitting={isSubmitting}
                        onSubmit={formMethods.handleSubmit(onFormSubmit)}
                        onCancel={handleCancel}
                    >
                        <FieldReportProjectActivityFormFields />
                    </EntityForm>
                </Grid>
            </FormContainer>
        </FormProvider>
    );
};

export default FieldReportProjectActivityForm;
