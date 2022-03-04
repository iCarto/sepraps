import {useEffect, useState} from "react";
import {useLocation, useOutletContext, useParams} from "react-router-dom";

import {ProjectService} from "service/api";

import {SubPageLayout} from "layout";
import {SectionCard} from "components/common/presentational";
import {MilestonePath} from "components/milestone/presentational";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useColorMilestone} from "components/milestone/hooks";
import Divider from "@mui/material/Divider";

const ViewProjectMilestonesSubPage = () => {
    const {id} = useParams();
    const location = useLocation();
    let project;
    [project] = useOutletContext();
    const getMilestoneColor = useColorMilestone();

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
                                <Box key={phase.code}>
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {phase.name}
                                    </Typography>
                                    <Divider
                                        sx={{
                                            backgroundColor: getMilestoneColor(
                                                phase.milestones[0].category
                                            ),
                                        }}
                                    ></Divider>
                                    <MilestonePath
                                        milestones={phase.milestones}
                                        level={0}
                                        activeMilestone={project.active_milestone}
                                    />
                                </Box>
                            );
                        })}
                    </SectionCard>
                </Grid>
            </Grid>
        </SubPageLayout>
    );
};

export default ViewProjectMilestonesSubPage;
