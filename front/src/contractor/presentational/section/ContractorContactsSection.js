import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractorService} from "contractor/service";
import {ContactService} from "contact/service";
import {createContractor} from "contractor/model";
import {useProviderContactsTable} from "provider/data";
import {
    useMenuGenericDeleteAction,
    useMenuGenericEditAction,
    useMenuGenericRemoveAction,
} from "base/ui/menu/hooks";

import {SectionCard} from "base/ui/section/components";
import {ContactsTable} from "contact/presentational";

import Typography from "@mui/material/Typography";
import {AccordionLayout} from "base/shared/components";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import {AuthAction} from "base/user/components";
import Grid from "@mui/material/Grid";
import {EntityAddButtonGroup} from "base/entity/components/presentational";
import {ROLES} from "base/user";

const ContractorContactsSection = ({contractor}) => {
    const [selectedElement, setSelectedElement] = useState(null);

    const navigate = useNavigateWithReload();
    const {idInfoPanel} = useParams();
    const {tableColumns} = useProviderContactsTable();

    const handleEditElement = elementId => {
        setSelectedElement(elementId);
        navigate(`contractor/contact/edit/${elementId}`);
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
        ContactService
    );
    const {action: removeAction, dialog: removeDialog} = useMenuGenericRemoveAction(
        contractor,
        "contacts",
        ContractorService,
        createContractor
    );

    return (
        <AccordionLayout
            accordionTitle="Contactos"
            accordionIcon={<PermContactCalendarIcon />}
            defaultExpanded={true}
        >
            {removeDialog}
            {deleteDialog}
            <SectionCard>
                {contractor.contacts.length ? (
                    <ContactsTable
                        customTableColumns={tableColumns}
                        contacts={contractor.contacts}
                        elementActions={[editAction, removeAction, deleteAction]}
                        selectedElement={selectedElement}
                        onSelectElement={handleSelectElement}
                    />
                ) : (
                    <Typography paddingY={3} textAlign="center">
                        Este contratista no tiene contactos.
                    </Typography>
                )}
                <AuthAction roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}>
                    <Grid item container xs={12} mt={3} justifyContent="center">
                        <EntityAddButtonGroup basePath="contractor/contact/" />
                    </Grid>
                </AuthAction>
            </SectionCard>
        </AccordionLayout>
    );
};

export default ContractorContactsSection;
