import {Fragment} from "react";

import MilestonePoint from "./MilestonePoint";

import Grid from "@mui/material/Grid";

const MilestonePath = ({milestones, level, activeMilestone}) => {
    return (
        <Grid container spacing={3}>
            {milestones.map(milestone => {
                if (milestone.children.length) {
                    return (
                        <Fragment key={milestone.category}>
                            <Grid item xs={12}>
                                <MilestonePoint
                                    milestone={milestone}
                                    level={level}
                                    isActiveMilestone={
                                        activeMilestone.category === milestone.category
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MilestonePath
                                    milestones={milestone.children}
                                    level={level + 1}
                                    activeMilestone={activeMilestone}
                                />
                            </Grid>
                        </Fragment>
                    );
                }
                return (
                    <Grid item xs={12} key={milestone.category}>
                        <MilestonePoint
                            milestone={milestone}
                            level={level}
                            isActiveMilestone={
                                activeMilestone.category === milestone.category
                            }
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default MilestonePath;
