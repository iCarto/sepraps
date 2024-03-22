import {useOutletContext} from "react-router-dom";

import {ProjectProgressSection} from "project/presentational/section";

import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {EntityViewSubPage} from "base/entity/components/container";
import {NotificationsSection} from "notification/presentational";
import {ViewOrUpdateProjectSummaryContent} from ".";
import {
    ProjectContractSection,
    ProjectOtherContractsSection,
} from "project/presentational/financing";
import Grid from "@mui/material/Grid";

const ViewProjectSummarySubPage = () => {
    const context = useOutletContext();
    const project = context[0];
    const notifications = context[1];

    let sections = [
        <ViewOrUpdateProjectSummaryContent project={project} />,
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                <ProjectProgressSection project={project} />
            </Grid>
            <Grid item xs={12} md={6}>
                <NotificationsSection
                    notifications={notifications}
                    hideIfEmpty={true}
                />
            </Grid>
        </Grid>,
        <ProjectContractSection contract={project?.construction_contract} />,
        <ProjectOtherContractsSection
            contracts={project?.related_contracts.filter(
                contract => contract.id !== project?.construction_contract?.id
            )}
        />,
        <EntityAuditSection entity={project} />,
    ];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectSummarySubPage;
