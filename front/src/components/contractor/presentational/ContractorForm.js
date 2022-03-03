import {FormProvider, useForm} from "react-hook-form";
import {createContractor} from "model";

import {DomainProvider, LocationProvider} from "components/common/provider";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ContractorFormFields from "./ContractorFormFields";

const ContractorForm = ({contractor = null, onSubmit = null, onCancel = null}) => {
    const formMethods = useForm({
        defaultValues: contractor
            ? {
                  id: contractor.id,
                  name: contractor.name,
                  contractor_type: contractor.contractor_type,
                  phone: contractor.phone,
                  email: contractor.email,
              }
            : {
                  id: null,
                  name: "",
                  contractor_type: "",
                  phone: "",
                  emial: "",
              },
        reValidateMode: "onSubmit",
    });

    const handleFormSubmit = data => {
        const updatedContractor = createContractor({
            id: data.id,
            name: data.name,
            contractor_type: data.contractor_type,
            phone: data.phone,
            email: data.email,
            contacts: contractor ? [...contractor.contacts] : [],
        });
        onSubmit(updatedContractor);
    };

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <Grid container component="form">
                        <ContractorFormFields />
                    </Grid>
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        <Grid>
                            {onCancel && (
                                <Button color="inherit" onClick={onCancel}>
                                    Cancelar
                                </Button>
                            )}
                            {onSubmit && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ml: 3}}
                                    onClick={formMethods.handleSubmit(handleFormSubmit)}
                                >
                                    Guardar
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </FormProvider>
            </DomainProvider>
        </LocationProvider>
    );
};

export default ContractorForm;
