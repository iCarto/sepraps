import {usePhaseMilestone} from "../hooks";

import styled from "@mui/material/styles/styled";
import {MilestoneTimelinePhase, MilestoneTimelineItem} from ".";

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
        padding: "42px 0 62px",
    },
    listStyle: "none",
}));

const MilestoneTimeline = ({milestones}) => {
    const getMilestonePhase = usePhaseMilestone();

    const allPhaseMilestones = milestones.map(milestone => {
        return (
            <MilestoneTimelineItem
                key={milestone.category}
                phase={getMilestonePhase(milestone.category)}
                categoryName={milestone.category_name}
                completionDate={milestone.compliance_date}
            />
        );
    });

    const designMilestones = [];
    const contractingMilestones = [];
    const executionMilestones = [];
    const postExecutionMilestones = [];

    allPhaseMilestones.map(milestone => {
        switch (milestone.props.phase) {
            case "design":
                designMilestones.push(milestone);
                break;
            case "contracting":
                contractingMilestones.push(milestone);
                break;
            case "execution":
                executionMilestones.push(milestone);
                break;
            case "post-execution":
                postExecutionMilestones.push(milestone);
                break;
            default:
                break;
        }
    });

    return (
        <TimelineContainer>
            <MilestoneTimelinePhase phase="design" milestones={designMilestones} />
            <MilestoneTimelinePhase
                phase="contracting"
                milestones={contractingMilestones}
            />
            <MilestoneTimelinePhase
                phase="execution"
                milestones={executionMilestones}
            />
            <MilestoneTimelinePhase
                phase="post-execution"
                milestones={postExecutionMilestones}
            />
        </TimelineContainer>
    );
};

export default MilestoneTimeline;
