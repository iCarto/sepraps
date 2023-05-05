import {useOutletContext} from "react-router-dom";

import {
    ProjectFinancingSection,
    ProjectGeneralDataSection,
    ProjectLocationSection,
} from "project/presentational/section";

import {EntityAuditSection} from "base/entity/sections";
import {EntityViewSubPage} from "base/entity/pages";

const ViewProjectSummarySubPage = () => {
    let project;
    [project] = useOutletContext();

    const sections = [
        <ProjectGeneralDataSection project={project} />,
        <ProjectLocationSection project={project} />,
        <ProjectFinancingSection project={project} />,
        <EntityAuditSection entity={project} />,
    ];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectSummarySubPage;
