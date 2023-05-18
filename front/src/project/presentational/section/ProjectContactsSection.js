import {useState} from "react";

import {useAuth} from "base/user/provider";
import {ProviderService} from "provider/service";

import {SectionCard} from "base/ui/section/components";
import {AlertError} from "base/error/components";
import {ContactsTable} from "contact/presentational";
import {RemoveItemDialog} from "base/delete/components";

import Typography from "@mui/material/Typography";
import {useNavigateWithReload} from "base/navigation/hooks";

const ProjectContactsSection = ({projectId, contacts}) => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [error, setError] = useState("");

    const handleActions = (contactId, clickedAction) => {
        switch (clickedAction) {
            case "edit":
                handleEdit(contactId);
                break;
            case "remove":
                setIsRemoveDialogOpen(true);
                break;
            default:
                break;
        }
    };

    const handleEdit = contactId => {
        navigate(`provider/contact/${contactId}/edit`);
    };

    const handleUpdateProvider = updatedProvider => {
        ProviderService.update(updatedProvider)
            .then(() => {
                navigate(`/projects/${projectId}/contacts`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <>
            <SectionCard title="Contactos del proyecto">
                <AlertError error={error} />
                {contacts.length ? (
                    <ContactsTable contacts={contacts} />
                ) : (
                    <Typography
                        sx={{
                            paddingY: 3,
                            textAlign: "center",
                        }}
                    >
                        Este proyecto no tiene contactos.
                    </Typography>
                )}
            </SectionCard>
            <RemoveItemDialog
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
                onRemove={handleUpdateProvider}
            />
        </>
    );
};

export default ProjectContactsSection;
