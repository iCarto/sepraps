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
                  id: provider.id,
                  name: provider.name,
                  area: provider.area,
                  locality: {
                      non_existent: false,
                      code: provider.locality.code,
                      name: provider.locality.name,
                      district: provider.locality.district,
                      district_name: provider.locality.district_name,
                      department: provider.locality.department,
                      department_name: provider.locality.department_name,
                  },
              }
            : {
                  id: null,
                  name: "",
                  area: "",
                  locality: {
                      non_existent: false,
                      code: "",
                      name: "",
                      district: "",
                      district_name: "",
                      department: "",
                      department_name: "",
                  },
              },
        reValidateMode: "onSubmit",
    });

    const handleFormSubmit = data => {
        const updatedProvider = createProvider({
            id: data.id,
            name: data.name,
            area: data.area,
            locality: createLocality({
                code:
                    data.locality.code && data.locality.code !== ""
                        ? data.locality.code
                        : null,
                name: data.locality.name,
                district: data.locality.district,
                district_name: data.locality.district_name,
                department: data.locality.department,
                department_name: data.locality.department_name,
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

export default ProviderForm;
