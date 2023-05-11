import {useState} from "react";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useAuth} from "base/user/provider";
import {ProviderService} from "provider/service";

import {SectionCard} from "base/section/components";
import {AlertError} from "base/error/components";
import {ContactsTable} from "contact/presentational";
import {DeleteProviderContactDialog} from "../../container";

import Typography from "@mui/material/Typography";
import {RemoveItemDialog} from "base/delete/components";
import {createProvider} from "provider/model";

const ProviderContactsSection = ({provider}) => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [contactToRemove, setContactToRemove] = useState(null);
    const [error, setError] = useState("");

    const handleActions = (contactId, clickedAction) => {
        switch (clickedAction) {
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
        navigate(`edit/${contactId}`);
    };

    const handleUpdateProvider = updatedProvider => {
        ProviderService.update(updatedProvider)
            .then(() => {
                navigate(`/projects/${provider.project}/contacts`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <>
            <SectionCard>
                <AlertError error={error} />
                {provider.contacts.length ? (
                    <ContactsTable
                        contacts={provider.contacts}
                        handleActions={handleActions}
                    />
                ) : (
                    <Typography paddingY={3} textAlign="center">
                        Este prestador no tiene contactos.
                    </Typography>
                )}
            </SectionCard>
            <RemoveItemDialog
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
                onRemove={handleUpdateProvider}
                itemToRemove={contactToRemove}
                createEntityObject={createProvider}
                entity={provider}
                subEntityList={provider.contacts}
                subEntityName={"contacts"}
            />
            <DeleteProviderContactDialog
                provider={provider}
                contactToDelete={contactToRemove}
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
            />
        </>
    );
};

export default ProviderContactsSection;
