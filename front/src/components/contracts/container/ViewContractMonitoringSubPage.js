import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {SubPageLayout} from "layout";

import Grid from "@mui/material/Grid";
import {SectionCard} from "components/common/presentational";
import {ContractContactsSection} from "../presentational";

const ViewContractMonitoringSubPage = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    let contract;
    [contract] = useOutletContext();

    const getIsSidePanelOpen = isOpen => {
        setIsSidePanelOpen(isOpen);
    };

    return (
        <SubPageLayout
            outletContext={[contract]}
            getIsSidePanelOpen={getIsSidePanelOpen}
            isSidePanelOpen={isSidePanelOpen}
        >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SectionCard title="Contactos de supervisión">
                        <ContractContactsSection
                            contract={contract}
                            isSidePanelOpen={isSidePanelOpen}
                        />
                    </SectionCard>
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewContractMonitoringSubPage;
