import {useState} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {ProjectService} from "service/api";
import {DateUtil, DATE_FORMATS, NumberUtil} from "utilities";

import {SidebarContainer} from "components/common/presentational";
import {DomainProvider} from "components/common/provider";
import {ProviderFormFields} from "./";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// TO-DO: REFACTOR - CODE IS ALMOST THE SAME AS IN ProviderSidebarAdd

const ProviderSidebarEdit = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    let project;
    [project] = useOutletContext();

    const formMethods = useForm({
        defaultValues: {
            provider_id: project?.provider?.id,
            provider_name: project?.provider?.name,
            provider_area: project?.provider?.area,
            provider_location: {
                department: project?.provider?.department,
                district: project?.provider?.district,
                locality: project?.provider?.locality,
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
                id: data.provider_id,
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
        ProjectService.updateProject(updatedProject, project.id)
            .then(() => {
                navigate(`/project/${project.id}`);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    const handleCancel = () => {
        navigate(`/project/${project.id}`);
    };

    return (
        <SidebarContainer>
            <Box component="form" width="90%" margin={3}>
                <Grid container>
                    <Grid item xs={12} sx={{mb: 2}}>
                        <Typography variant="h5">Editar prestador</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <DomainProvider>
                        <FormProvider {...formMethods}>
                            <ProviderFormFields />
                        </FormProvider>
                    </DomainProvider>
                </Grid>
                <Grid container justifyContent="flex-end">
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
        </SidebarContainer>
    );
};

export default ProviderSidebarEdit;
