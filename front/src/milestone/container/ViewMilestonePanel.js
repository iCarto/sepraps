import {useParams} from "react-router-dom";

import {MilestoneService} from "milestone/service";
import {MilestoneSection} from "milestone/presentational";
import {EntitySummaryPanel} from "base/entity/components/presentational";

const ViewMilestonePanel = () => {
    const {milestoneId: id} = useParams();

    const getSectionData = milestone => {
        return <MilestoneSection milestone={milestone} />;
    };

    return (
        <EntitySummaryPanel
            service={MilestoneService}
            id={id}
            title="Hito"
            getSectionTitle={milestone => milestone?.name}
            getSectionData={getSectionData}
            showClickDetailButton={milestone => false}
        />
    );
};

export default ViewMilestonePanel;
