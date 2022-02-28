import {usePhaseMilestone} from "../hooks";

import {styled} from "@mui/material/styles";
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

    const phaseOneMilestones = [];
    const phaseTwoMilestones = [];
    const phaseThreeMilestones = [];
    const phaseFourMilestones = [];

    allPhaseMilestones.map(milestone => {
        switch (milestone.props.phase) {
            case "phaseOne":
                phaseOneMilestones.push(milestone);
                break;
            case "phaseTwo":
                phaseTwoMilestones.push(milestone);
                break;
            case "phaseThree":
                phaseThreeMilestones.push(milestone);
                break;
            case "phaseFour":
                phaseFourMilestones.push(milestone);
                break;
            default:
                break;
        }
    });

    return (
        <TimelineContainer>
            <MilestoneTimelinePhase phase="phaseOne" milestones={phaseOneMilestones} />
            <MilestoneTimelinePhase phase="phaseTwo" milestones={phaseTwoMilestones} />
            <MilestoneTimelinePhase
                phase="phaseThree"
                milestones={phaseThreeMilestones}
            />
            <MilestoneTimelinePhase
                phase="phaseFour"
                milestones={phaseFourMilestones}
            />
        </TimelineContainer>
    );
};

export default MilestoneTimeline;
