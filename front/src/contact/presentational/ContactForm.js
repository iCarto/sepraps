import {FormProvider, useForm} from "react-hook-form";

import {DomainProvider} from "sepraps/domain/provider";
import {ContactFormFields} from "contact/presentational";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ContactForm = ({
    contact = null,
    allowedPosts = null,
    onSubmit,
    showPostField = false,
    showIsStaff = false,
}) => {
    const formMethods = useForm({
        defaultValues: contact
            ? {
                  id: contact?.id,
                  name: contact?.name,
                  ci_number: contact?.ci_number,
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
                  ci_number: null,
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

    return (
        <DomainProvider>
            <FormProvider {...formMethods}>
                <Grid container component="form">
                    <ContactFormFields
                        allowedPosts={allowedPosts}
                        showPostField={showPostField}
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
