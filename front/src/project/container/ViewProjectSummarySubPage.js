import {useOutletContext} from "react-router-dom";

import {
    ProjectFinancingSection,
    ProjectLocationSection,
} from "project/presentational/section";

import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {EntityViewSubPage} from "base/entity/components/container";
import {ViewOrUpdateProjectSummaryContent} from ".";

const ViewProjectSummarySubPage = () => {
    let project;
    [project] = useOutletContext();

    const sections = [
        <ViewOrUpdateProjectSummaryContent project={project} />,
        <ProjectLocationSection project={project} />,
        <ProjectFinancingSection project={project} />,
        <EntityAuditSection entity={project} />,
    ];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectSummarySubPage;
