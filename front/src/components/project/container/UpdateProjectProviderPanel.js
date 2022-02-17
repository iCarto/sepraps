import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {useNavigateWithReload} from "hooks";
import {createProvider} from "model";
import {ProviderService} from "service/api";

import {SidebarPanel} from "layout";
import {DomainProvider} from "components/common/provider";
import {
    ProviderFormFields,
    ProviderFormSearch,
} from "components/provider/presentational";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// TO-DO: REFACTOR
// action === "edit" conditionals (use constants?)

const UpdateProjectProviderPanel = () => {
    const {action} = useParams();

    const [selectedOption, setSelectedOption] = useState("form");
    const [error, setError] = useState("");
    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    const formMethods = useForm({
        defaultValues:
            action === "edit"
                ? {
                      provider_id: project?.provider?.id,
                      provider_name: project?.provider?.name,
                      provider_area: project?.provider?.area,
                      provider_location: {
                          locality: project?.provider?.locality?.code,
                          district: project?.provider?.locality?.district,
                          department: project?.provider?.locality?.department,
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

    const onSubmit = data => {
        const updatedProvider = createProvider({
            id: data.provider_id,
            name: data.provider_name,
            area: data.provider_area,
            locality: data.provider_location.locality,
            project: project.id,
            contacts: [...project.provider.contacts],
        });
        handleFormSubmit(updatedProvider);
    };

    const handleFormSubmit = provider => {
        const serviceAction = provider.id
            ? ProviderService.updateProvider
            : ProviderService.createProvider;
        serviceAction(provider)
            .then(() => {
                navigate(`/projects/${project.id}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleCancel = () => {
        navigate(`/projects/${project.id}`);
    };

    const changeProviderFormValues = provider => {
        const values = formMethods.getValues();
        values["provider_id"] = provider.id;
        values["provider_name"] = provider.name;
        values["provider_area"] = provider.area;
        values["provider_location"] = {
            department: provider.locality.department,
            district: provider.locality.district,
            locality: provider.locality.code,
        };
        formMethods.reset({
            ...values,
        });
    };

    const handleChange = (event, selectedOption) => {
        setSelectedOption(selectedOption);
        changeProviderFormValues(createProvider());
    };

    const handleSelectExistingProvider = selectedExistingProvider => {
        changeProviderFormValues(selectedExistingProvider);
    };

    return (
        <SidebarPanel>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <Box component="form" width="90%" margin={3}>
                        <Grid container>
                            <Grid item xs={12} sx={{mb: 2}}>
                                <Typography variant="h5">Añadir prestador</Typography>
                            </Grid>

                            <Grid item container justifyContent="center" xs={12}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={selectedOption}
                                    exclusive
                                    onChange={handleChange}
                                >
                                    <ToggleButton value="form">
                                        {action === "edit"
                                            ? "Modificar"
                                            : "Crear nuevo"}
                                    </ToggleButton>
                                    <ToggleButton value="existing">
                                        Seleccionar existente
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item container xs={12}>
                                {selectedOption === "form" ? (
                                    <ProviderFormFields />
                                ) : (
                                    <ProviderFormSearch
                                        handleSelect={handleSelectExistingProvider}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        {error && (
                            <Alert severity="error" sx={{mb: 2}}>
                                {error}
                            </Alert>
                        )}
                        <Grid container justifyContent="flex-end" sx={{mt: 2}}>
                            <Button color="inherit" onClick={handleCancel}>
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ml: 2}}
                                onClick={formMethods.handleSubmit(onSubmit)}
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Box>
                </FormProvider>
            </DomainProvider>
        </SidebarPanel>
    );
};

export default UpdateProjectProviderPanel;