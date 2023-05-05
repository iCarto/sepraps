import {FormProvider, useForm} from "react-hook-form";

import {ProviderCreationForm, ProviderModificationForm} from ".";
import {FormUtil} from "base/form/utilities";
import {EntityForm} from "base/entity/form";
import {LocationProvider} from "sepraps/location/provider";
import {DomainProvider} from "sepraps/domain/provider";

const ProviderForm = ({
    provider = null,
    onSubmit,
    onCancel = null,
    updatedSection = null,
}) => {
    const defaultFormValues = {
        id: FormUtil.getFormValue(provider?.id),
        name: FormUtil.getFormValue(provider?.name),
        area: FormUtil.getFormValue(provider?.area),
        locality: {
            non_existent: false,
            code: FormUtil.getFormValue(provider?.locality.code),
            name: FormUtil.getFormValue(provider?.locality.name),
            district: FormUtil.getFormValue(provider?.locality.district),
            district_name: FormUtil.getFormValue(provider?.locality.district_name),
            department: FormUtil.getFormValue(provider?.locality.department),
            department_name: FormUtil.getFormValue(provider?.locality.department_name),
        },
    };

    const formMethods = useForm({
        defaultValues: defaultFormValues,
        reValidateMode: "onSubmit",
    });

    const onFormSubmit = data => {
        onSubmit({
            id: FormUtil.getDataValue(data.id),
            name: FormUtil.getDataValue(data.name),
            area: FormUtil.getFormValue(data.area),
            locality: {
                non_existent: false,
                code: FormUtil.getFormValue(data.locality.code),
                name: FormUtil.getFormValue(data.locality.name),
                district: FormUtil.getFormValue(data.locality.district),
                district_name: FormUtil.getFormValue(data.locality.district_name),
                department: FormUtil.getFormValue(data.locality.department),
                department_name: FormUtil.getFormValue(data.locality.department_name),
            },
        });
    };

    const onFormCancel = () => {
        onCancel();
    };

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    {updatedSection ? (
                        <EntityForm onSubmit={formMethods.handleSubmit(onFormSubmit)}>
                            <ProviderModificationForm section={updatedSection} />
                        </EntityForm>
                    ) : (
                        <ProviderCreationForm
                            onSubmit={formMethods.handleSubmit(onFormSubmit)}
                            onCancel={onFormCancel}
                        />
                    )}
                </FormProvider>
            </DomainProvider>
        </LocationProvider>
    );
};

export default ProviderForm;
