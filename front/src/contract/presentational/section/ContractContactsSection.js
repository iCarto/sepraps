import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractContactService, ContractService} from "contract/service";
import {ContactService} from "contact/service";
import {useProviderContactsTable} from "provider/data";
import {
    useMenuGenericDeleteAction,
    useMenuGenericEditAction,
    useMenuGenericRemoveAction,
} from "base/ui/menu/hooks";

import {SectionCard} from "base/ui/section/components";
import {ContactsTable} from "contact/presentational";

import Typography from "@mui/material/Typography";
import {contract_view_adapter, createContract} from "contract/model";

const ContractContactsSection = ({contract, area = null}) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [contacts, setContacts] = useState([]);

    const navigate = useNavigateWithReload();
    const {idInfoPanel} = useParams();
    const {tableColumns} = useProviderContactsTable();

    const handleSelectElement = elementId => {
        setSelectedElement(elementId);
        navigate(`info/${elementId}`);
    };

    useEffect(() => {
        ContractService.getContacts(contract.id, area).then(contacts => {
            setContacts(contacts);
        });
    }, [contract, area]);

    useEffect(() => {
        // If the sidebar panel is open we must highlight the element
        setSelectedElement(idInfoPanel ? parseInt(idInfoPanel) : null);
    }, [idInfoPanel]);

    const {action: editAction} = useMenuGenericEditAction();
    const {action: deleteAction, dialog: deleteDialog} = useMenuGenericDeleteAction(
        element => ContactService.delete(element.contact_id)
    );
    const {action: removeAction, dialog: removeDialog} = useMenuGenericRemoveAction(
        element => ContractContactService.delete(element.id)
    );

    return (
        <>
            {removeDialog}
            {deleteDialog}
            <SectionCard>
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
                        Este contrato no tiene contactos.
                    </Typography>
                )}
            </SectionCard>
        </>
    );
};

export default ContractContactsSection;
