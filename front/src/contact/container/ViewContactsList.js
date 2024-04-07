import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {ContactService} from "contact/service";
import {useNavigateWithReload} from "base/navigation/hooks";
import {
    useMenuGenericDeleteAction,
    useMenuGenericEditAction,
    useMenuGenericRemoveAction,
} from "base/ui/menu/hooks";
import {useProviderContactsTable} from "provider/data";
import {ROLES} from "base/user";

import {EntityAddButtonGroup} from "base/entity/components/presentational";
import {AuthAction} from "base/user/components";
import {ContactsTable} from "contact/presentational";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ViewContactsList = ({
    service,
    basePath,
    entityId,
    entityName,
    filter = null,
    area = null,
    hideActions = false,
}) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [contacts, setContacts] = useState([]);

    const navigate = useNavigateWithReload();
    const {idInfoPanel} = useParams();
    const {tableColumns} = useProviderContactsTable();

    useEffect(() => {
        if (entityId) {
            service.getList(entityId, filter).then(contacts => {
                setContacts(contacts);
            });
        }
    }, [entityId, filter]);

    const handleEditElement = elementId => {
        setSelectedElement(elementId);
        navigate(
            area
                ? `${basePath}${area}/edit/${elementId}`
                : `${basePath}edit/${elementId}`
        );
    };

    const handleSelectElement = elementId => {
        setSelectedElement(elementId);
        if (!hideActions) {
            navigate(`info/${elementId}`);
        }
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
                    elementActions={
                        hideActions ? [] : [editAction, removeAction, deleteAction]
                    }
                    selectedElement={selectedElement}
                    onSelectElement={handleSelectElement}
                />
            ) : (
                <Typography paddingY={3} textAlign="center">
                    Este {entityName} no tiene contactos.
                </Typography>
            )}
            {!hideActions && (
                <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                    <Grid item container xs={12} mt={3} justifyContent="center">
                        <EntityAddButtonGroup
                            basePath={
                                basePath && area
                                    ? `${basePath}/${area}`
                                    : !area
                                    ? basePath
                                    : `${area}/`
                            }
                        />
                    </Grid>
                </AuthAction>
            )}
        </>
    );
};

export default ViewContactsList;
