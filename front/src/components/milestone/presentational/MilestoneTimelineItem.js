import {DateUtil} from "utilities";
import styled from "@mui/material/styles/styled";
import {MilestoneTimelineTooltip} from ".";

const TimelineMilestone = styled("li")(({phase, milestone, date, theme}) => ({
    display: "inline-block",
    width: "20px",
    height: "20px",
    minWidth: "20px",
    minHeight: "20px",
    [theme.breakpoints.up("md")]: {
        margin: "-4px 18px",
    },
    [theme.breakpoints.up("lg")]: {
        margin: "-4px 29px",
    },
    [theme.breakpoints.up("xl")]: {
        margin: "-4px 40px",
    },
    transform: "translateY(-25%)",
    textAlign: "center",
    lineHeight: "1.2",
    borderRadius: "50%",
    border: `2px solid ${theme.palette[phase].main}`,
    background: "white",
    ...(date && {
        border: `2px solid ${theme.palette[phase].dark}`,
        background: `${theme.palette[phase].main}`,
    }),
}));

const MilestoneTimelineItem = ({phase, categoryName, completionDate}) => {
    return (
        <MilestoneTimelineTooltip
            milestone={categoryName}
            completionDate={DateUtil.formatDate(completionDate)}
        >
            <TimelineMilestone
                phase={phase}
                milestone={categoryName}
                date={DateUtil.formatDate(completionDate)}
            />
        </MilestoneTimelineTooltip>
    );
};

export default MilestoneTimelineItem;
