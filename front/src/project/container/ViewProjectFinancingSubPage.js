import {useOutletContext} from "react-router-dom";

import {
    ProjectContractSection,
    ProjectFinancingDataSection,
} from "project/presentational/financing";
import {EntityViewSubPage} from "base/entity/pages";

const ViewProjectFinancingSubPage = () => {
    let project;
    [project] = useOutletContext();

    const sections = [
        <ProjectContractSection contract={project?.construction_contract} />,
        <ProjectFinancingDataSection project={project} />,
    ];

    return project && <EntityViewSubPage sections={sections} />;
};

export default ViewProjectFinancingSubPage;
