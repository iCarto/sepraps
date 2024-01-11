import {FormProvider, useForm} from "react-hook-form";

import {FormUtil} from "base/form/utilities";

import {FormContainer, FormInputText} from "base/form/components";
import {EntityForm} from "base/entity/components/form";
import {AlertError} from "base/error/components";
import Grid from "@mui/material/Grid";

const BuildingComponentNameForm = ({
    buildingComponent = null,
    onSubmit,
    onCancel = null,
    error = null,
}) => {
    console.log(buildingComponent);
    const defaultFormValues = {
        id: FormUtil.getFormValue(buildingComponent?.id),
        name: FormUtil.getFormValue(buildingComponent?.name),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            name: FormUtil.getDataValue(data.name),
        });
    };

    return (
        <FormProvider {...formMethods}>
            <AlertError error={error} />
            <FormContainer>
                <EntityForm
                    onSubmit={formMethods.handleSubmit(onFormSubmit)}
                    onCancel={onCancel}
                >
                    <Grid container item xs={6}>
                        <FormInputText
                            name="name"
                            label="Nombre del componente"
                            rules={{required: "Este campo es obligatorio"}}
                        />
                    </Grid>
                </EntityForm>
            </FormContainer>
        </FormProvider>
    );
};

export default BuildingComponentNameForm;
