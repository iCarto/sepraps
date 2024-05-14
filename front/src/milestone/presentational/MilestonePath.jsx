import {Timeline} from "@mui/lab";

import MilestonePoint from "./MilestonePoint";

const MilestonePath = ({milestones, level, activeMilestone, isProjectClosed}) => {
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
                        isProjectClosed={isProjectClosed}
                    />
                );
            })}
        </Timeline>
    );
};

export default MilestonePath;
