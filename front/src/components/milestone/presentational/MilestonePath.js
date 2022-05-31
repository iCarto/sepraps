import {Fragment} from "react";

import MilestonePoint from "./MilestonePoint";

import {Timeline} from "@mui/lab";

const MilestonePath = ({milestones, level, activeMilestone}) => {
    return (
        <Timeline sx={{ml: level * 0.5}}>
            {milestones.map((milestone, index) => {
                if (milestone.children.length) {
                    return (
                        <Fragment key={milestone.code}>
                            <MilestonePoint
                                milestone={milestone}
                                level={level}
                                activeMilestone={activeMilestone}
                                isFirst={index === 0}
                                isLast={index === milestones.length - 1}
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
                        key={milestone.code}
                        milestone={milestone}
                        level={level}
                        activeMilestone={activeMilestone}
                        isFirst={index === 0}
                        isLast={index === milestones.length - 1}
                    />
                );
            })}
        </Timeline>
    );
};

export default MilestonePath;
