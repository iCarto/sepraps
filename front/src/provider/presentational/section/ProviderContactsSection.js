import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {ProviderService} from "provider/service";
import {ContactService} from "contact/service";
import {createProvider} from "provider/model";
import {useProviderContactsTable} from "provider/data";
import {
    useMenuGenericDeleteAction,
    useMenuGenericEditAction,
    useMenuGenericRemoveFromListAction,
} from "base/ui/menu/hooks";

import {SectionCard} from "base/ui/section/components";
import {ContactsTable} from "contact/presentational";

import Typography from "@mui/material/Typography";

const ProviderContactsSection = ({provider}) => {
    const [selectedElement, setSelectedElement] = useState(null);

    const navigate = useNavigateWithReload();
    const {idInfoPanel} = useParams();
    const {tableColumns} = useProviderContactsTable();

    const {action: editAction} = useMenuGenericEditAction();
    const {action: deleteAction, dialog: deleteDialog} = useMenuGenericDeleteAction(
        element => ContactService.delete(element.contact_id)
    );
    const {
        action: removeAction,
        dialog: removeDialog,
    } = useMenuGenericRemoveFromListAction(
        provider,
        "contacts",
        ProviderService,
        createProvider
    );

    const handleSelectElement = elementId => {
        setSelectedElement(elementId);
        navigate(`info/${elementId}`);
    };

    useEffect(() => {
        // If the sidebar panel is open we must highlight the element
        setSelectedElement(idInfoPanel ? parseInt(idInfoPanel) : null);
    }, [idInfoPanel]);

    return (
        <>
            {removeDialog}
            {deleteDialog}
            <SectionCard>
                {provider.contacts.length ? (
                    <ContactsTable
                        customTableColumns={tableColumns}
                        contacts={provider.contacts}
                        elementActions={[editAction, removeAction, deleteAction]}
                        selectedElement={selectedElement}
                        onSelectElement={handleSelectElement}
                    />
                ) : (
                    <Typography paddingY={3} textAlign="center">
                        Este prestador no tiene contactos.
                    </Typography>
                )}
            </SectionCard>
        </>
    );
};

export default ProviderContactsSection;
