import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";

import {EntityForm} from "base/entity/components/form";
import {FieldReportProjectActivitiesFormFields} from ".";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const FieldReportProjectActivitiesForm = ({
    activity = null,
    onSubmit,
    onCancel,
    display = true,
}) => {
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
        //TO-DO: When canceling new activity form, reset all form fields (including images)
        onCancel();
    };

    const onFormSubmit = data => {
        //TO-DO: Implement
        console.log(data);
    };

    return (
        <FormProvider {...formMethods}>
            <Grid
                container
                display={display ? "inherit" : "none"}
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
                        <FieldReportProjectActivitiesFormFields />
                    </EntityForm>
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default FieldReportProjectActivitiesForm;
