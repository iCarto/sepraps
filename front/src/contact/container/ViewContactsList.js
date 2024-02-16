import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {ContactService} from "contact/service";
import {useNavigateWithReload} from "base/navigation/hooks";
import {useProviderContactsTable} from "provider/data";
import {
    useMenuGenericDeleteAction,
    useMenuGenericEditAction,
    useMenuGenericRemoveAction,
} from "base/ui/menu/hooks";

import {EntityAddButtonGroup} from "base/entity/components/presentational";
import {SectionCard} from "base/ui/section/components";
import {AuthAction} from "base/user/components";
import {ROLES} from "base/user";

import {ContactsTable} from "contact/presentational";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ViewContactsList = ({service, basePath, entityId, entityName, filter = null}) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [contacts, setContacts] = useState([]);

    const navigate = useNavigateWithReload();
    const {idInfoPanel} = useParams();
    const {tableColumns} = useProviderContactsTable();

    useEffect(() => {
        service.getList(entityId, filter).then(contacts => {
            setContacts(contacts);
        });
    }, [entityId, filter]);

    const handleEditElement = elementId => {
        setSelectedElement(elementId);
        navigate(`${basePath}edit/${elementId}`);
    };

    const handleSelectElement = elementId => {
        setSelectedElement(elementId);
        navigate(`info/${elementId}`);
    };

    useEffect(() => {
        // If the sidebar panel is open we must highlight the element
        setSelectedElement(idInfoPanel ? parseInt(idInfoPanel) : null);
    }, [idInfoPanel]);

    const {action: editAction} = useMenuGenericEditAction(handleEditElement);
    const {action: deleteAction, dialog: deleteDialog} = useMenuGenericDeleteAction(
        element => ContactService.delete(element.contact_id)
    );
    const {action: removeAction, dialog: removeDialog} = useMenuGenericRemoveAction(
        element => service.delete(element.id)
    );

    return (
        <>
            {removeDialog}
            {deleteDialog}
            {contacts.length ? (
                <ContactsTable
                    customTableColumns={tableColumns}
                    contacts={contacts}
                    elementActions={[editAction, removeAction, deleteAction]}
                    selectedElement={selectedElement}
                    onSelectElement={handleSelectElement}
                />
            ) : (
                <Typography paddingY={3} textAlign="center">
                    Este {entityName} no tiene contactos.
                </Typography>
            )}
            <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                <Grid item container xs={12} mt={3} justifyContent="center">
                    <EntityAddButtonGroup basePath={basePath} />
                </Grid>
            </AuthAction>
        </>
    );
};

export default ViewContactsList;
