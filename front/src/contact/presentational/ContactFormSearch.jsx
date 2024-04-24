import {FormProvider, useForm} from "react-hook-form";

import {DomainProvider} from "sepraps/domain/provider";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ContactFormSearchFields from "./ContactFormSearchFields";

const ContactFormSearch = ({allowedPosts = null, onSubmit}) => {
    const formMethods = useForm({
        defaultValues: {
            post: "",
            contact_id: "",
        },
        reValidateMode: "onSubmit",
    });

    const handleSubmit = data => {
        console.log({data});
        onSubmit(data);
    };

    return (
        <DomainProvider>
            <FormProvider {...formMethods}>
                <Grid container component="form">
                    <ContactFormSearchFields allowedPosts={allowedPosts} />
                </Grid>
                <Grid container justifyContent="center" sx={{mt: 2}}>
                    <Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ml: 2}}
                            onClick={formMethods.handleSubmit(handleSubmit)}
                        >
                            Añadir
                        </Button>
                    </Grid>
                </Grid>
            </FormProvider>
        </DomainProvider>
    );
};

export default ContactFormSearch;
