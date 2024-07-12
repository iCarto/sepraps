import {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";

import {BuildingComponentService} from "buildingComponent/service";
import {building_component_view_adapter} from "buildingComponent/model";
import {FormUtil} from "base/form/utilities";
import {useNavigateWithReload} from "base/navigation/hooks";

import {FormContainer, FormInputText} from "base/form/components";
import {EntityFormHorizontal} from "base/entity/components/form";
import {AlertError} from "base/error/components";

const BuildingComponentNameForm = ({buildingComponent = null, onCloseForm = null}) => {
    const navigate = useNavigateWithReload();
    const [error, setError] = useState(null);

    const defaultFormValues = {
        id: FormUtil.getFormValue(buildingComponent?.id),
        name: FormUtil.getFormValue(buildingComponent?.name),
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        return handleFormSubmit({
            id: FormUtil.getDataValue(data.id),
            name: FormUtil.getDataValue(data.name),
        });
    };

    const updateEntity = (formData, updateService, dataAdapter) => {
        return updateService
            .update(dataAdapter(formData))
            .then(updatedData => {
                onCloseForm();
                navigate("", true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    const handleFormSubmit = updatedBuildingComponent => {
        return updateEntity(
            {
                ...buildingComponent,
                ...updatedBuildingComponent,
            },
            BuildingComponentService,
            building_component_view_adapter
        );
    };

    return (
        <FormProvider {...formMethods}>
            <AlertError error={error} />
            <FormContainer>
                <EntityFormHorizontal
                    onSubmit={formMethods.handleSubmit(onFormSubmit)}
                    onCancel={onCloseForm}
                >
                    <FormInputText
                        name="name"
                        label="Nombre del componente"
                        rules={{required: "Este campo es obligatorio"}}
                    />
                </EntityFormHorizontal>
            </FormContainer>
        </FormProvider>
    );
};

export default BuildingComponentNameForm;
