import styled from "@mui/material/styles/styled";
import {MilestoneTimelineItem} from ".";

const TimelinePhase = styled("li")(({phase, theme}) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))",
    position: "relative",
    alignItems: "center",
    height: "40px",
    padding: "10px 0",
}));

const TimelinePhaseName = styled("span")(({phase, theme}) => ({
    position: "absolute",
    bottom: "40px",
    fontSize: "12px",
    lineHeight: "1",
    paddingLeft: "3px",
    color: `${theme.palette[phase].dark}`,
    textTransform: "uppercase",
}));

const TimelineBase = styled("ul")(({phase, theme}) => ({
    display: "flex",
    padding: 0,
    height: "2px",
    listStyle: "none",
    backgroundColor: `${theme.palette[phase].dark}`,
}));

const MilestoneTimelinePhase = ({phase}) => {
    return (
        <>
            <TimelinePhase phase={phase.code}>
                <TimelinePhaseName phase={phase.code}>{phase.name}</TimelinePhaseName>
                <TimelineBase phase={phase.code}>
                    {phase.milestones.map(milestone => {
                        return (
                            <MilestoneTimelineItem
                                key={milestone.code}
                                phase={phase.code}
                                categoryName={milestone.name}
                                completionDate={milestone.compliance_date}
                            />
                        );
                    })}
                </TimelineBase>
            </TimelinePhase>
        </>
    );
};

export default MilestoneTimelinePhase;
