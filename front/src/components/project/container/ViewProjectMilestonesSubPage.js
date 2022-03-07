import {useEffect, useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "service/api";

import {SubPageLayout} from "layout";
import {SectionCard} from "components/common/presentational";
import Grid from "@mui/material/Grid";
import {useColorMilestone} from "components/milestone/hooks";
import {MilestonePhase} from "components/milestone/presentational";

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

    let phases = [];
    milestones.forEach(milestone => {
        let phase = phases.find(phase => phase.code === milestone["phase"]);
        if (!phase) {
            phase = {
                code: milestone["phase"],
                name: milestone["phase_name"],
                milestones: [],
            };
            phases.push(phase);
        }
        phase.milestones.push(milestone);
    });
    console.log({phases});

    return (
        <SubPageLayout outletContext={[project]}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <SectionCard title="Hitos del proyecto">
                        {phases.map(phase => {
                            return (
                                <MilestonePhase
                                    phase={phase}
                                    activeMilestone={project.active_milestone}
                                />
                            );
                        })}
                    </SectionCard>
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectMilestonesSubPage;
