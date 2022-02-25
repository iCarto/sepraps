import {FormProvider, useForm} from "react-hook-form";
import {createLocality, createProvider} from "model";

import {DomainProvider, LocationProvider} from "components/common/provider";
import {ProviderFormFields} from "components/provider/presentational";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ProviderForm = ({provider = null, onSubmit = null, onCancel = null}) => {
    const formMethods = useForm({
        defaultValues: provider
            ? {
                  provider_id: provider.id,
                  provider_name: provider.name,
                  provider_area: provider.area,
                  provider_location: {
                      locality: provider.locality.code,
                      district: provider.locality.district,
                      department: provider.locality.department,
                  },
              }
            : {
                  provider_id: null,
                  provider_name: "",
                  provider_area: "",
                  provider_location: {
                      department: "",
                      district: "",
                      locality: "",
                  },
              },
        reValidateMode: "onSubmit",
    });

    const handleFormSubmit = data => {
        const updatedProvider = createProvider({
            id: data.provider_id,
            name: data.provider_name,
            area: data.provider_area,
            locality: createLocality({
                code: data.provider_location.locality,
                district: data.provider_location.locality,
                department: data.provider_location.department,
            }),
            contacts: provider ? [...provider.contacts] : [],
        });
        onSubmit(updatedProvider);
    };

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <Grid container component="form">
                        <ProviderFormFields />
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
                                    sx={{ml: 2}}
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

export default ProviderForm;
