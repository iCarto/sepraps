import {useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {ProjectService} from "service/api";
import {DateUtil, DATE_FORMATS, NumberUtil} from "utilities";

import {
    ProviderFormFields,
    ProviderFormSearch,
} from "components/provider/presentational";
import {DomainProvider} from "components/common/provider";
import {SidebarContainer} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const emptyProvider = {
    id: null,
    name: "",
    area: "",
    department: "",
    district: "",
    locality: "",
};

// TO-DO: REFACTOR - CODE IS ALMOST THE SAME AS IN ProviderSidebarEdit

const ProviderSidebarAdd = () => {
    const [selectedOption, setSelectedOption] = useState("new");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    let project;
    [project] = useOutletContext();

    const formMethods = useForm({
        defaultValues: {
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
        const updatedProject = {
            id: project.id,
            name: project.name,
            init_date: DateUtil.formatDate(
                project.init_date,
                DATE_FORMATS.SERVER_DATEFORMAT
            ),
            project_type: project.project_type,
            project_class: project.project_class,
            provider: {
                id: null,
                name: data.provider_name,
                area: data.provider_area,
                department: data.provider_location.department,
                district: data.provider_location.district,
                locality: data.provider_location.locality,
            },
            main_infrastructure: {
                department: project.main_infrastructure.department,
                district: project.main_infrastructure.district,
                locality: project.main_infrastructure.locality,
                latitude: NumberUtil.parseFloatOrNull(
                    project.main_infrastructure.latitude
                ),
                longitude: NumberUtil.parseFloatOrNull(
                    project.main_infrastructure.longitude
                ),
                altitude: NumberUtil.parseIntOrNull(
                    project.main_infrastructure.altitude
                ),
            },
            linked_localities: project.linked_localities.map(linked_locality => {
                return {
                    locality: linked_locality.locality,
                };
            }),
            contacts: project.contacts.map(contact => {
                return {
                    id: contact.id,
                    name: contact.name,
                    post: contact.post,
                    gender: contact.gender,
                    phone: contact.phone,
                    email: contact.email,
                    comments: contact.comments,
                };
            }),
            financing_fund: project.financing_fund,
            financing_program: project.financing_program,
        };
        handleFormSubmit(updatedProject);
    };

    const handleFormSubmit = updatedProject => {
        ProjectService.updateProject(updatedProject)
            .then(() => {
                navigate(`/project/${project.id}`);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const changeProviderFormValues = provider => {
        const values = formMethods.getValues();
        values["provider_id"] = provider.id;
        values["provider_name"] = provider.name;
        values["provider_area"] = provider.area;
        values["provider_location"] = {
            department: provider.department,
            district: provider.district,
            locality: provider.locality,
        };
        formMethods.reset({
            ...values,
        });
    };

    const handleChange = (event, selectedOption) => {
        setSelectedOption(selectedOption);
        changeProviderFormValues(emptyProvider);
    };

    const handleSelectExistingProvider = selectedExistingProvider => {
        changeProviderFormValues(selectedExistingProvider);
    };

    const handleCancel = () => {
        navigate(`/project/${project.id}`);
    };

    return (
        <SidebarContainer>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <Box component="form" width="90%" margin={3}>
                        <Grid container>
                            <Grid item xs={12} sx={{mb: 2}}>
                                <Typography variant="h5">Añadir prestador</Typography>
                            </Grid>
                            {/* {error && (
                                <Alert severity="error">
                                    {error} sx={{mb: 2}}
                                </Alert>
                            )} */}
                            <Grid item container justifyContent="center" xs={12}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={selectedOption}
                                    exclusive
                                    onChange={handleChange}
                                >
                                    <ToggleButton value="new">Crear nuevo</ToggleButton>
                                    <ToggleButton value="existing">
                                        Seleccionar existente
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item xs={12}>
                                {selectedOption === "new" ? (
                                    <ProviderFormFields />
                                ) : (
                                    <ProviderFormSearch
                                        handleSelect={handleSelectExistingProvider}
                                    />
                                )}
                            </Grid>
                        </Grid>
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
        </SidebarContainer>
    );
};

export default ProviderSidebarAdd;
