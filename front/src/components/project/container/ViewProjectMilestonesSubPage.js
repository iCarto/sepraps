import {useEffect, useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "service/api";

import {SubPageLayout} from "layout";
import {MilestonePath} from "components/milestone/presentational";
import Container from "@mui/material/Container";

const ViewProjectMilestonesSubPage = () => {
    const {id} = useParams();
    const location = useLocation();
    let project;
    [project] = useOutletContext();

    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        ProjectService.getProjectMilestones(id).then(milestones => {
            setMilestones(milestones);
        });
    }, [id, location.state?.lastRefreshDate]);

    return (
        <SubPageLayout outletContext={[project]}>
            <Container maxWidth="lg" sx={{my: 3}}>
                <MilestonePath
                    milestones={milestones}
                    level={0}
                    activeMilestone={project.active_milestone}
                />
            </Container>
        </SubPageLayout>
    );
};

export default ViewProjectMilestonesSubPage;
