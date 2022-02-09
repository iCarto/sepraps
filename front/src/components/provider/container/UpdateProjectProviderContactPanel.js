import {useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {useNavigateWithReload} from "hooks";
import {createContact, createProvider} from "model";
import {ProviderService} from "service/api";

import {SidebarPanel} from "layout";
import {DomainProvider} from "components/common/provider";
import {ContactFormFields, ContactFormSearch} from "components/contacts/presentational";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

// TO-DO: REFACTOR
// action === "edit" conditionals (use constants?)

const UpdateProjectProviderContactPanel = () => {
    const {action} = useParams();
    const {contactId} = useParams();

    const [selectedOption, setSelectedOption] = useState("form");
    const [error, setError] = useState("");

    const navigate = useNavigateWithReload();

    let project;
    [project] = useOutletContext();

    let selectedContact = project.provider.contacts.find(
        contact => contact.id == contactId
    );

    const formMethods = useForm({
        defaultValues:
            action === "edit"
                ? {
                      contact_id: selectedContact?.id,
                      contact_name: selectedContact?.name,
                      contact_post: selectedContact?.post,
                      contact_gender: selectedContact?.gender,
                      contact_phone: selectedContact?.phone,
                      contact_email: selectedContact?.email,
                      contact_comments: selectedContact?.comments,
                  }
                : {
                      contact_id: null,
                      contact_name: "",
                      contact_post: "",
                      contact_gender: "",
                      contact_phone: "",
                      contact_email: "",
                      contact_comments: "",
                  },
        reValidateMode: "onSubmit",
    });

    const onSubmit = data => {
        const updatedProvider = createProvider({
            id: project.provider.id,
            name: project.provider.name,
            area: project.provider.area,
            locality: project.provider.locality.code,
            project: project.id,
            contacts: [
                ...project.provider.contacts,
                {
                    id: data.contact_id,
                    name: data.contact_name,
                    post: data.contact_post,
                    post_name: data.contact_post_name,
                    gender: data.contact_gender,
                    phone: data.contact_phone,
                    email: data.contact_email,
                    comments: data.contact_comments,
                },
            ],
        });
        handleFormSubmit(updatedProvider);
    };

    const handleFormSubmit = provider => {
        ProviderService.updateProvider(provider)
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

    const changeContactFormValues = contact => {
        const values = formMethods.getValues();
        values["contact_id"] = contact.id;
        values["contact_name"] = contact.name;
        values["contact_gender"] = contact.gender;
        values["contact_post"] = contact.post;
        values["contact_phone"] = contact.phone;
        values["contact_email"] = contact.email;
        values["contact_comments"] = contact.comments;
        formMethods.reset({
            ...values,
        });
    };

    const handleChange = (event, selectedOption) => {
        setSelectedOption(selectedOption);
        changeContactFormValues(createContact());
    };

    const handleSelectExistingContact = selectedExistingContact => {
        changeContactFormValues(selectedExistingContact);
    };

    return (
        <SidebarPanel>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <Box component="form" width="90%" margin={3}>
                        <Grid container>
                            <Grid item xs={12} sx={{mb: 2}}>
                                <Typography variant="h5">
                                    {action === "edit"
                                        ? "Modificar contacto"
                                        : "Añadir contacto"}
                                </Typography>
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
                                    <ContactFormFields />
                                ) : (
                                    <ContactFormSearch
                                        handleSelect={handleSelectExistingContact}
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

export default UpdateProjectProviderContactPanel;
