import {useOutletContext} from "react-router-dom";

import {
    ProjectFinancingSection,
    ProjectGeneralDataSection,
    ProjectLocationSection,
} from "project/presentational/section";

import {EntityAuditSection} from "base/entity/components/presentational/sections";
import {EntityViewSubPage} from "base/entity/components/container";
import {NotificationsSection} from "notification/presentational";

const ViewProjectSummarySubPage = () => {
    const context = useOutletContext();
    const project = context[0];
    const notifications = context[1];

    let sections = [
        <ProjectGeneralDataSection project={project} />,
        <ProjectLocationSection project={project} />,
        <ProjectFinancingSection project={project} />,
        <EntityAuditSection entity={project} />,
    ];

    if (notifications.length) {
        sections = [
            <NotificationsSection notifications={notifications} />,
            ...sections,
        ];
    }

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectSummarySubPage;
