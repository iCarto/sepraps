import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractService} from "contract/service";
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

const ContractContactsSection = ({contract}) => {
    const [selectedElement, setSelectedElement] = useState(null);

    const navigate = useNavigateWithReload();
    const {idInfoPanel} = useParams();
    const {tableColumns} = useProviderContactsTable();

    const handleSelectElement = elementId => {
        setSelectedElement(elementId);
        navigate(`info/${elementId}`);
    };

    useEffect(() => {
        // If the sidebar panel is open we must highlight the element
        setSelectedElement(idInfoPanel ? parseInt(idInfoPanel) : null);
    }, [idInfoPanel]);

    const {action: editAction} = useMenuGenericEditAction();
    const {action: deleteAction, dialog: deleteDialog} = useMenuGenericDeleteAction(
        ContactService
    );
    const {action: removeAction, dialog: removeDialog} = useMenuGenericRemoveAction(
        contract,
        "contacts",
        ContractService,
        entityObject => createContract(contract_view_adapter(entityObject))
    );

    return (
        <>
            {removeDialog}
            {deleteDialog}
            <SectionCard>
                {contract.contacts.length ? (
                    <ContactsTable
                        customTableColumns={tableColumns}
                        contacts={contract.contacts}
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
