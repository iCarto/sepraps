import {useState} from "react";
import {useOutletContext} from "react-router-dom";

import {SubPageLayout} from "layout";
import {ContractMonitoringContactSection} from "../presentational/monitoring";
import {RemoveContractMonitoringProfileDialog} from "./monitoring";

import Grid from "@mui/material/Grid";

const ViewContractMonitoringSubPage = () => {
    const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
    const [profileToRemove, setProfileToRemove] = useState("");
    const [profileNameToRemove, setProfileNameToRemove] = useState("");
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    let contract;
    [contract] = useOutletContext();

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    const handleOpenDialog = (isOpen, selectedProfile, selectedPostName) => {
        setIsRemoveDialogOpen(isOpen);
        setProfileToRemove(selectedProfile);
        setProfileNameToRemove(selectedPostName);
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
                        contact={contract?.field_manager}
                        sectionName="field_manager"
                        postName="Residente de obra"
                        showIsStaff={false}
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={contract?.construction_inspector}
                        sectionName="construction_inspector"
                        postName="Fiscal de obra"
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={contract?.construction_supervisor}
                        sectionName="construction_supervisor"
                        postName="Supervisor de obra"
                        showIsStaff={false}
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={contract?.social_coordinator}
                        sectionName="social_coordinator"
                        postName="Coordinador de apoyo social"
                        showIsStaff={false}
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={contract?.social_inspector}
                        sectionName="social_inspector"
                        postName="Fiscal social"
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={contract?.social_supervisor}
                        sectionName="social_supervisor"
                        postName="Supervisor social"
                        showIsStaff={false}
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>

                <RemoveContractMonitoringProfileDialog
                    contract={contract}
                    profileToRemove={profileToRemove}
                    postName={profileNameToRemove}
                    isDialogOpen={isRemoveDialogOpen}
                    setIsDialogOpen={setIsRemoveDialogOpen}
                />
            </Grid>
        </SubPageLayout>
    );
};

export default ViewContractMonitoringSubPage;
