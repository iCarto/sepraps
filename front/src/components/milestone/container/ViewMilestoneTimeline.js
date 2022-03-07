import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {ProjectService} from "service/api";

import {MilestoneTimeline} from "../presentational";

const ViewMilestoneTimeline = () => {
    const {id: projectId} = useParams();
    const location = useLocation();

    const [milestonesPhases, setMilestonesPhases] = useState([]);

    useEffect(() => {
        ProjectService.getProjectMilestones(projectId).then(milestones => {
            setMilestonesPhases(milestones);
        });
    }, [projectId, location.state?.lastRefreshDate]);

    return <MilestoneTimeline milestonesPhases={milestonesPhases} />;
};

export default ViewMilestoneTimeline;
