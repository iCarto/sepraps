import {useState} from "react";
import {useOutletContext} from "react-router-dom";

import {SubPageLayout} from "layout";
import {ContractMonitoringContactSection} from "../presentational/monitoring";
import {RemoveContractMonitoringProfileDialog} from "./monitoring";

import Grid from "@mui/material/Grid";

const ViewContractMonitoringSubPage = () => {
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [profileToRemove, setProfileToRemove] = useState("");
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    let project;
    [project] = useOutletContext();

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    let contract;
    [contract] = useOutletContext();

    const fakeContractContacts = [
        // TO-DO: DEPENDING ON FINAL API STRUCTURE, LOOP ARRAY AND SHOW SECTIONS BASED ON ROLE NAME
        {
            id: 1,
            role: "Residente de obra",
            name: "María Rodríguez Rodríguez",
            gender: "F",
            phone: "+11 123 456 789",
            email: "maría@rodriguez.com",
            staff: false,
            comments: "Tiene una observación",
        },
        {
            id: 2,
            role: "Fiscal constructivo",
            name: "Clara Pérez Pérez",
            gender: "F",
            phone: "+11 123 456 789",
            email: "clara@perez.com",
            staff: true,
            comments: "",
        },
    ];

    const handleOpenDialog = (isOpen, selectedProfile) => {
        setIsRemoveDialogOpen(isOpen);
        setProfileToRemove(selectedProfile);
    };

    return (
        <SubPageLayout
            outletContext={[contract]}
            getIsSidePanelOpen={getIsSidePanelOpen}
            isSidePanelOpen={isSidePanelOpen}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={fakeContractContacts[0]}
                        sectionName="Residente de obra"
                        showIsStaff={false}
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={fakeContractContacts[1]}
                        sectionName="Fiscal constructivo"
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        // contact={fakeContractContacts[0]}
                        sectionName="Supervisor constructivo"
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={fakeContractContacts[1]}
                        sectionName="Coordinador de apoyo social"
                        showIsStaff={false}
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={fakeContractContacts[0]}
                        sectionName="Fiscal social"
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={fakeContractContacts[0]}
                        sectionName="Supervisor social"
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>

                <RemoveContractMonitoringProfileDialog
                    contract={contract}
                    profileToRemove={profileToRemove}
                    isDialogOpen={isRemoveDialogOpen}
                    setIsDialogOpen={setIsRemoveDialogOpen}
                />
            </Grid>
        </SubPageLayout>
    );
};

export default ViewContractMonitoringSubPage;
