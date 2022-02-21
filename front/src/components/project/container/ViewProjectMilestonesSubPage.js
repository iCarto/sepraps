import {useEffect, useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "service/api";

import {SubPageLayout} from "layout";
import {SectionCard} from "components/common/presentational";
import {MilestonePath} from "components/milestone/presentational";
import Grid from "@mui/material/Grid";

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
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SectionCard title="Hitos del proyecto">
                        <MilestonePath
                            milestones={milestones}
                            level={0}
                            activeMilestone={project.active_milestone}
                        />
                    </SectionCard>
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectMilestonesSubPage;
