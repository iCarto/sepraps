import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {MilestonePath} from ".";
import styled from "@mui/material/styles/styled";

const MilestonePhaseText = styled(Typography)(({code, theme}) => ({
    textTransform: "uppercase",
    color: theme.palette[code].dark,
    padding: 5,
}));

const MilestonePhaseDivider = styled(Divider)(({code, theme}) => ({
    backgroundColor: theme.palette[code].main,
}));

const MilestonePhase = ({phase, activeMilestone, isProjectClosed}) => {
    return (
        <Box key={phase.code}>
            <MilestonePhaseText code={phase.code}>{phase.name}</MilestonePhaseText>
            <MilestonePhaseDivider code={phase.code} />
            <MilestonePath
                milestones={phase.milestones}
                level={0}
                activeMilestone={activeMilestone}
                isProjectClosed={isProjectClosed}
            />
        </Box>
    );
};

export default MilestonePhase;
