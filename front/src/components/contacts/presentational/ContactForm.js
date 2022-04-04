import {FormProvider, useForm} from "react-hook-form";

import {DomainProvider} from "components/common/provider";
import {ContactFormFields} from "components/contacts/presentational";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ContactForm = ({
    contact = null,
    allowedPosts = null,
    onSubmit,
    isMonitoringProfile = false,
    showIsStaff = false,
}) => {
    const formMethods = useForm({
        defaultValues: contact
            ? {
                  contact_id: contact?.id,
                  contact_name: contact?.name,
                  contact_post: contact?.post,
                  contact_gender: contact?.gender,
                  contact_phone: contact?.phone,
                  contact_email: contact?.email,
                  contact_comments: contact?.comments,
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

    const handleSubmit = data => {
        onSubmit(data);
    };

    return (
        <DomainProvider>
            <FormProvider {...formMethods}>
                <Grid container component="form">
                    <ContactFormFields
                        allowedPosts={allowedPosts}
                        isMonitoringProfile={isMonitoringProfile}
                        showIsStaff={showIsStaff}
                    />
                </Grid>
                <Grid container justifyContent="center" sx={{mt: 2}}>
                    <Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ml: 2}}
                            onClick={formMethods.handleSubmit(handleSubmit)}
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </FormProvider>
        </DomainProvider>
    );
};

export default ContactForm;
