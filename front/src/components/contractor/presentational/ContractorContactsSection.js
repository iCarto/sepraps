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
import {AlertError} from "components/common/presentational";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Typography from "@mui/material/Typography";

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
                setError(error);
            });
    };

    return (
        <Fragment>
            <AccordionLayout
                accordionTitle="Contactos"
                accordionIcon={<PermContactCalendarIcon />}
            >
                <Grid container spacing={2}>
                    <Grid item container xs={12} justifyContent="center">
                        {contractor.contacts.length !== 0 ? (
                            <ContactsTable
                                contacts={contractor.contacts}
                                handleActions={handleActions}
                            />
                        ) : (
                            <Typography pt={3} sx={{fontStyle: "italic"}}>
                                Este prestador aún no tiene contactos
                            </Typography>
                        )}
                    </Grid>
                    <Grid item container xs={12} mt={3} justifyContent="center">
                        <AddContactButtonGroup
                            basePath="contractor/contact"
                            btnName="Añadir contacto"
                        />
                    </Grid>
                    <AlertError error={error} />
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
