import styled from "@mui/material/styles/styled";
import {MilestoneTimelinePhase} from ".";

const TimelineContainer = styled("ul")(({theme}) => ({
    display: "flex",
    position: "relative",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
    padding: "42px 0 48px",
    [theme.breakpoints.down("lg")]: {
        padding: "42px 0 20px",
    },
    [theme.breakpoints.down("xl")]: {
        padding: "42px 0 20px",
    },
    listStyle: "none",
}));

const MilestoneTimeline = ({milestonesPhases}) => {
    return (
        <TimelineContainer>
            {milestonesPhases.map(phase => {
                return <MilestoneTimelinePhase key={phase.code} phase={phase} />;
            })}
        </TimelineContainer>
    );
};

export default MilestoneTimeline;
