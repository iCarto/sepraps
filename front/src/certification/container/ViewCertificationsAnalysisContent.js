import {useOutletContext} from "react-router-dom";

import {ViewCertificationsByProjectFinancialChart} from ".";
import {SectionCard} from "base/ui/section/components";

const ViewCertificationsAnalysisContent = () => {
    const {project} = useOutletContext();

    return (
        <SectionCard title="Seguimiento financiero">
            {project ? (
                <ViewCertificationsByProjectFinancialChart project={project} />
            ) : null}
        </SectionCard>
    );
};

export default ViewCertificationsAnalysisContent;
