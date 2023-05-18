import {useEffect, useState} from "react";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";

import {MilestoneService} from "milestone/service";
import {MilestoneSection} from "milestone/presentational";
import {EntityViewPanel} from "base/entity/components/presentational";

const ViewMilestonePanel = () => {
    const navigate = useNavigate();
    const [milestone, setMilestone] = useState(null);

    const {milestoneId} = useParams();

    let project;
    [project] = useOutletContext();

    useEffect(() => {
        MilestoneService.get(milestoneId).then(milestone => {
            setMilestone(milestone);
        });
    }, [milestoneId]);

    const handleCloseSidebar = () => {
        navigate(`/projects/${project.id}/milestones`);
    };

    return (
        milestone && (
            <EntityViewPanel
                title="Detalle del hito"
                showDetailButton={false}
                onClickCloseSidebar={handleCloseSidebar}
            >
                {<MilestoneSection milestone={milestone} />}
            </EntityViewPanel>
        )
    );
};

export default ViewMilestonePanel;
