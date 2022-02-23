import {useEffect, useState} from "react";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {MilestoneService} from "service/api";

import {SidebarPanel} from "layout";
import {MilestoneSection} from "../presentational";

const ViewMilestonePanel = () => {
    const {milestoneId} = useParams();
    const navigate = useNavigate();
    let project;
    [project] = useOutletContext();

    const [milestone, setMilestone] = useState(null);

    console.log({milestone});

    useEffect(() => {
        MilestoneService.getMilestone(milestoneId).then(milestone => {
            console.log({milestone});
            setMilestone(milestone);
        });
    }, [milestoneId]);

    const handleCloseSidebar = () => {
        navigate(`/projects/${project.id}/milestones`);
    };

    return (
        <SidebarPanel
            sidebarTitle="Vista de detalle"
            closeSidebarClick={handleCloseSidebar}
        >
            <MilestoneSection milestone={milestone} />
        </SidebarPanel>
    );
};

export default ViewMilestonePanel;
