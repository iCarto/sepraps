import {useParams} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {createContact} from "model";

import {DomainProvider, LocationProvider} from "components/common/provider";
import {ContractMonitoringContactFormFields} from ".";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ContractMonitoringContactForm = ({contact = null, onSubmit = null}) => {
    const {sectionName} = useParams();

    const formMethods = useForm({
        defaultValues: contact
            ? {
                  contact_id: contact.id,
                  contact_name: contact.name,
                  contact_role: sectionName,
                  contact_gender: contact.gender,
                  contact_phone: contact.phone,
                  contact_email: contact.email,
                  contact_comments: contact.comments,
                  contact_staff: contact.staff,
              }
            : {
                  contact_id: null,
                  contact_name: "",
                  contact_role: sectionName,
                  contact_gender: "",
                  contact_phone: "",
                  contact_email: "",
                  contact_comments: "",
                  contact_staff: false,
              },
        reValidateMode: "onSubmit",
    });

    const handleFormSubmit = data => {
        console.log({data});
        const updatedContact = createContact({
            id: data.contact_id,
            name: data.contact_name,
            post: data.contact_role,
            gender: data.contact_gender,
            phone: data.contact_phone,
            email: data.contact_email,
            comments: data.contact_comments,
            // contacts: contact ? [...contact.contacts] : [],
        });
        onSubmit(updatedContact);
    };

    return (
        <LocationProvider>
            <DomainProvider>
                <FormProvider {...formMethods}>
                    <Grid container component="form">
                        <ContractMonitoringContactFormFields />
                    </Grid>
                    <Grid container justifyContent="center" sx={{mt: 2}}>
                        <Grid>
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

export default ContractMonitoringContactForm;
