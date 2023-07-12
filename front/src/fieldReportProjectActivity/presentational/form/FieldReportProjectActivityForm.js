import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";

import {EntityForm} from "base/entity/components/form";
import {FieldReportProjectActivityFormFields} from ".";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const FieldReportProjectActivityForm = ({activity = null, onSubmit, onCancel}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(activity?.id),
        text: FormUtil.getFormValue(activity?.text),
        title: FormUtil.getFormValue(activity?.title),
        date: FormUtil.getFormValue(activity?.date),
        notes: FormUtil.getFormValue(activity?.notes),
        images: FormUtil.getFormValue(activity?.images || []),
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
            images: [],
        });
        onCancel();
    };

    const onFormSubmit = data => {
        const updatedActivity = {
            id: FormUtil.getDataValue(data.id),
            text: FormUtil.getDataValue(data.text),
            title: FormUtil.getDataValue(data.title),
            date: FormUtil.getDataValue(data.date),
            notes: FormUtil.getDataValue(data.notes),
            images: FormUtil.getDataValue(data.images),
        };
        onSubmit(updatedActivity);
    };

    return (
        <FormProvider {...formMethods}>
            <Grid
                container
                mt={3}
                p={1}
                border={1}
                borderColor={"grey.300"}
                borderRadius={1}
                sx={{backgroundColor: "grey.50"}}
            >
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
                        onSubmit={formMethods.handleSubmit(onFormSubmit)}
                        onCancel={handleCancel}
                    >
                        <FieldReportProjectActivityFormFields />
                    </EntityForm>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default FieldReportProjectActivityForm;
