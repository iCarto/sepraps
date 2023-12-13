import {useOutletContext} from "react-router-dom";

import {SectionCard} from "base/ui/section/components";
import {ViewSocialComponentsTrainingsChart} from ".";

const ViewSocialComponentsAnalysisSubPage = () => {
    let project;
    [project] = useOutletContext();

    return (
        <SectionCard title="Supervisión de componentes sociales">
            {project ? (
                <ViewSocialComponentsTrainingsChart filter={{project: project.id}} />
            ) : null}
        </SectionCard>
    );
};

export default ViewSocialComponentsAnalysisSubPage;
