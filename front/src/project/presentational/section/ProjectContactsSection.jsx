import {useState} from "react";

import {useAuth} from "base/user/provider";
import {ProviderService} from "provider/service";

import {SectionCard} from "base/ui/section/components";
import {AlertError} from "base/error/components";
import {ContactsTable} from "contact/presentational";
import {RemoveItemDialog} from "base/delete/components";

import Typography from "@mui/material/Typography";
import {useNavigateWithReload} from "base/navigation/hooks";

const ProjectContactsSection = ({label, contacts}) => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const [selectedElement, setSelectedElement] = useState(null);

    const handleSelectElement = elementId => {
        setSelectedElement(elementId);
        navigate(`info/${elementId}`);
    };

    return (
        <>
            <SectionCard title={label}>
                {contacts.length ? (
                    <ContactsTable
                        contacts={contacts}
                        selectedElement={selectedElement}
                        onSelectElement={handleSelectElement}
                    />
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
        </>
    );
};

export default ProjectContactsSection;
