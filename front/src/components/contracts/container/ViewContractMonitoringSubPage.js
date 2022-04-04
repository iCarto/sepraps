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

    console.log({contract});

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
                        contact={contract?.field_manager}
                        postName="field_manager"
                        sectionName="Residente de obra"
                        showIsStaff={false}
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={contract?.construction_inspector}
                        postName="construction_inspector"
                        sectionName="Fiscal constructivo"
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={contract?.construction_supervisor}
                        postName="construction_supervisor"
                        sectionName="Supervisor constructivo"
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={contract?.social_coordinator}
                        postName="social_coordinator"
                        sectionName="Coordinador de apoyo social"
                        showIsStaff={false}
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={contract?.social_inspector}
                        postName="social_inspector"
                        sectionName="Fiscal social"
                        onOpenRemoveDialog={handleOpenDialog}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ContractMonitoringContactSection
                        contact={contract?.social_supervisor}
                        postName="social_supervisor"
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
