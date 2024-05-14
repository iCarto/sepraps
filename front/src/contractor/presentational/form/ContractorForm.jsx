import {FormProvider, useForm} from "react-hook-form";
import {createContractor} from "contractor/model";

import {LocationProvider} from "sepraps/location/provider";
import {DomainProvider} from "sepraps/domain/provider";
import {AlertError} from "base/error/components";
import {FormContainer} from "base/form/components";
import {EntityForm} from "base/entity/components/form";

const ContractorForm = ({
    contractor = null,
    onSubmit = null,
    onCancel = null,
    error = null,
    children,
}) => {
    const formMethods = useForm({
        defaultValues: contractor
            ? {
                  id: contractor.id,
                  name: contractor.name,
                  contractor_type: contractor.contractor_type,
                  address: contractor.address,
                  phone: contractor.phone,
                  email: contractor.email,
                  comments: contractor.comments,
              }
            : {
                  id: null,
                  name: "",
                  contractor_type: "",
                  address: "",
                  phone: "",
                  email: "",
                  comments: "",
              },
        reValidateMode: "onSubmit",
    });

    const handleFormSubmit = data => {
        const updatedContractor = createContractor({
            id: data.id,
            name: data.name,
            contractor_type: data.contractor_type,
            address: data.address,
            phone: data.phone,
            email: data.email,
            comments: data.comments,
            contacts: contractor ? [...contractor.contacts] : [],
        });
        onSubmit(updatedContractor);
    };

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <AlertError error={error} />
                    <FormContainer>
                        <EntityForm
                            onSubmit={formMethods.handleSubmit(handleFormSubmit)}
                            onCancel={onCancel}
                        >
                            {children}
                        </EntityForm>
                    </FormContainer>
                </FormProvider>
            </DomainProvider>
        </LocationProvider>
    );
};

export default ContractorForm;
