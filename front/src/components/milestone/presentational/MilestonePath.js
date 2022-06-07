import {Fragment} from "react";

import MilestonePoint from "./MilestonePoint";

import {Timeline} from "@mui/lab";

const MilestonePath = ({milestones, level, activeMilestone}) => {
    return (
        <Timeline sx={{ml: level * 0.5}}>
            {milestones.map((milestone, index) => {
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
