import {useState} from "react";
import {useFormContext} from "react-hook-form";

import {useDomain} from "components/common/provider";
import {
    ContactFormFields,
    ContactsTable,
    ContactFormSearch,
} from "components/contacts/presentational";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {FormSection} from "components/common/form";

const emptyContact = {
    id: null,
    name: "",
    post: "",
    gender: "",
    phone: "",
    email: "",
    comments: "",
};

const ProjectFormContactSection = () => {
    const {getValues, reset} = useFormContext();
    const {contactPosts} = useDomain();

    const [selectedOption, setSelectedOption] = useState("new");

    const changeContactFormValues = contact => {
        const values = getValues();
        values["contact_id"] = contact.id;
        values["contact_name"] = contact.name;
        values["contact_gender"] = contact.gender;
        values["contact_post"] = contact.post;
        values["contact_phone"] = contact.phone;
        values["contact_email"] = contact.email;
        values["contact_comments"] = contact.comments;
        reset({
            ...values,
        });
    };

    const handleChangeSelectedOption = (event, selectedOption) => {
        setSelectedOption(selectedOption);
        changeContactFormValues(emptyContact);
    };

    const handleSelectExistingContact = selectedExistingContact => {
        changeContactFormValues(selectedExistingContact);
    };

    const handleAdd = () => {
        const values = getValues();
        const contactToAdd = {
            id: values["contact_id"],
            name: values["contact_name"],
            post: values["contact_post"],
            post_name: contactPosts.find(post => post.value === values["contact_post"])
                .label,
            gender: values["contact_gender"],
            phone: values["contact_phone"],
            email: values["contact_email"],
            comments: values["contact_comments"],
        };
        reset({
            ...values,
            contacts: [...values["contacts"], contactToAdd],
        });
        changeContactFormValues(emptyContact);
    };

    const handleRemove = (index, contactId) => {
        const values = getValues();
        const contacts = values["contacts"];
        contacts.splice(index, 1);
        values["contacts"] = [...contacts];
        reset({
            ...values,
        });
    };

    return (
        <FormSection title="Contactos relacionados con el proyecto">
            <Grid container spacing={2}>
                <Grid item container justifyContent="center" xs={12}>
                    <ToggleButtonGroup
                        color="primary"
                        value={selectedOption}
                        exclusive
                        onChange={handleChangeSelectedOption}
                    >
                        <ToggleButton value="new">Crear nuevo</ToggleButton>
                        <ToggleButton value="existing">
                            Seleccionar existente
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12}>
                    {selectedOption === "new" ? (
                        <ContactFormFields />
                    ) : (
                        <ContactFormSearch handleSelect={handleSelectExistingContact} />
                    )}
                </Grid>
                <Grid item container justifyContent="center" xs={12}>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => handleAdd()}
                        endIcon={<AddIcon />}
                    >
                        Añadir a la lista
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <ContactsTable
                        contacts={getValues()["contacts"]}
                        handleRemove={handleRemove}
                    />
                </Grid>
            </Grid>
        </FormSection>
    );
};

export default ProjectFormContactSection;
