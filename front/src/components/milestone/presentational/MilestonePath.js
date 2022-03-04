import {Fragment} from "react";

import MilestonePoint from "./MilestonePoint";

import {Timeline} from "@mui/lab";

const MilestonePath = ({milestones, level, activeMilestone}) => {
    return (
        <Timeline sx={{ml: level * 5}}>
            {milestones.map((milestone, index) => {
                if (milestone.children.length) {
                    return (
                        <Fragment key={milestone.category}>
                            <MilestonePoint
                                milestone={milestone}
                                level={level}
                                isFirst={index === 0}
                                isLast={index === milestones.length - 1}
                                isActiveMilestone={
                                    activeMilestone.category === milestone.category
                                }
                            />
                            <MilestonePath
                                milestones={milestone.children}
                                level={level + 1}
                                activeMilestone={activeMilestone}
                            />
                        </Fragment>
                    );
                }
                return (
                    <MilestonePoint
                        key={milestone.category}
                        milestone={milestone}
                        level={level}
                        isFirst={index === 0}
                        isLast={index === milestones.length - 1}
                        isActiveMilestone={
                            activeMilestone.category === milestone.category
                        }
                    />
                );
            })}
        </Timeline>
    );
};

export default MilestonePath;
