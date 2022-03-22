import {Fragment, useState} from "react";
import {useNavigateWithReload} from "hooks";
import {ContractorService} from "service/api";

import {AccordionLayout} from "components/common/presentational";
import {AddContactButtonGroup, ContactsTable} from "components/contacts/presentational";
import {
    DeleteContractorContactDialog,
    RemoveContractorContactDialog,
} from "../container";

import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const ContractorContactsSection = ({contractor}) => {
    const navigate = useNavigateWithReload();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [contactToRemove, setContactToRemove] = useState(null);
    const [error, setError] = useState("");

    const handleActions = (contactId, action) => {
        switch (action) {
            case "remove":
                setContactToRemove(contactId);
                setIsRemoveDialogOpen(true);
                break;
            case "delete":
                setContactToRemove(contactId);
                setIsDeleteDialogOpen(true);
                break;
            case "edit":
                handleEdit(contactId);
                break;
            default:
                break;
        }
    };

    const handleEdit = contactId => {
        navigate(`contractor/contact/${contactId}/edit`);
    };

    const handleUpdateContractor = updatedContractor => {
        ContractorService.updateContractor(updatedContractor)
            .then(() => {
                navigate(`/contracts/${contractor.contract}`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error.toString());
            });
    };

    return (
        <Fragment>
            <AccordionLayout
                accordionTitle="Contactos"
                accordionIcon={<PermContactCalendarIcon />}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ContactsTable
                            contacts={contractor.contacts}
                            handleActions={handleActions}
                        />
                    </Grid>
                    <Grid item container xs={12} justifyContent="center">
                        <AddContactButtonGroup
                            basePath="contractor/contact"
                            btnName="Añadir contacto"
                        />
                    </Grid>
                    {error && (
                        <Grid item xs={12}>
                            <Alert severity="error" sx={{mt: 2, mb: 2}}>
                                {error}
                            </Alert>
                        </Grid>
                    )}
                </Grid>
            </AccordionLayout>
            <RemoveContractorContactDialog
                contractor={contractor}
                contactToRemove={contactToRemove}
                onRemoval={handleUpdateContractor}
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
            />
            <DeleteContractorContactDialog
                contractor={contractor}
                contactToDelete={contactToRemove}
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
            />
        </Fragment>
    );
};

export default ContractorContactsSection;
