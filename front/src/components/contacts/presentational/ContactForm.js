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
                  id: contact?.id,
                  name: contact?.name,
                  post: contact?.post,
                  gender: contact?.gender,
                  phone: contact?.phone,
                  email: contact?.email,
                  comments: contact?.comments,
                  is_staff: contact?.is_staff,
              }
            : {
                  id: null,
                  name: "",
                  post: "",
                  gender: "",
                  phone: "",
                  email: "",
                  comments: "",
                  is_staff: false,
              },
        reValidateMode: "onSubmit",
    });

    const handleSubmit = data => {
        onSubmit(data);
    };

    console.log(contact.is_staff);

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
