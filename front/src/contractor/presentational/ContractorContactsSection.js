import {useState} from "react";

import {useAuth} from "base/user/provider";
import {useNavigateWithReload} from "base/navigation/hooks";
import {ContractorService} from "contractor/service";
import {createContractor} from "contractor/model";

import {EntityAddButtonGroup} from "base/entity/components/presentational";
import {AuthAction} from "base/user/components";
import {AccordionLayout} from "base/shared/components";
import {RemoveItemDialog} from "base/delete/components";
import {AlertError} from "base/error/components";
import {ContactsTable} from "contact/presentational";
import {DeleteContractorContactDialog} from "contractor/container";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";

const ContractorContactsSection = ({contractor}) => {
    const navigate = useNavigateWithReload();
    const {ROLES} = useAuth();

    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [contactToRemove, setContactToRemove] = useState(null);
    const [error, setError] = useState("");

    //TO-DO: Fix table width after sidebar drawer refactoring

    // const tableContainerWidth = isSidePanelOpen
    //     ? {md: "350px", lg: "550px", xl: "100%"}
    //     : {md: "625px", lg: "100%", xl: "100%"};
    const tableContainerWidth = {md: "350px", lg: "550px", xl: "100%"};

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
        navigate(`contractor/contact/edit/${contactId}`);
    };

    const handleupdate = updatedContractor => {
        ContractorService.update(updatedContractor)
            .then(() => {
                navigate(`/contracts/${contractor.contract}/summary`, true);
            })
            .catch(error => {
                console.log(error);
                setError(error);
            });
    };

    return (
        <>
            <AccordionLayout
                accordionTitle="Contactos"
                accordionIcon={<PermContactCalendarIcon />}
            >
                <Grid container spacing={2}>
                    <Grid item container xs={12} justifyContent="center">
                        {contractor.contacts.length ? (
                            <Box
                                sx={{
                                    overflowX: "auto",
                                    overflowY: "hidden",
                                    width: tableContainerWidth,
                                }}
                            >
                                <ContactsTable
                                    contacts={contractor.contacts}
                                    handleActions={handleActions}
                                />
                            </Box>
                        ) : (
                            <Typography pt={3} sx={{fontStyle: "italic"}}>
                                Este contratista aún no tiene contactos
                            </Typography>
                        )}
                    </Grid>
                    <AuthAction
                        roles={[ROLES.EDIT, ROLES.MANAGEMENT, ROLES.SUPERVISION]}
                    >
                        <Grid item container xs={12} mt={3} justifyContent="center">
                            <EntityAddButtonGroup basePath="contractor/contact/" />
                        </Grid>
                    </AuthAction>
                    <AlertError error={error} />
                </Grid>
            </AccordionLayout>
            <RemoveItemDialog
                isDialogOpen={isRemoveDialogOpen}
                setIsDialogOpen={setIsRemoveDialogOpen}
                onRemove={handleupdate}
                itemToRemove={contactToRemove}
                createEntityObject={createContractor}
                entity={contractor}
                subEntityList={contractor.contacts}
                subEntityName={"contacts"}
            />
            <DeleteContractorContactDialog
                contractor={contractor}
                contactToDelete={contactToRemove}
                isDialogOpen={isDeleteDialogOpen}
                setIsDialogOpen={setIsDeleteDialogOpen}
            />
        </>
    );
};

export default ContractorContactsSection;
