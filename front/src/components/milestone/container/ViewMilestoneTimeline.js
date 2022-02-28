import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {ProjectService} from "service/api";

import {MilestoneTimeline} from "../presentational";

const ViewMilestoneTimeline = () => {
    const {id: projectId} = useParams();
    const location = useLocation();

    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        ProjectService.getProjectMilestones(projectId).then(milestones => {
            setMilestones(milestones);
        });
    }, [projectId, location.state?.lastRefreshDate]);

    return <MilestoneTimeline milestones={milestones} />;
};

export default ViewMilestoneTimeline;
