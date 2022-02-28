import {DateUtil} from "utilities";
import {styled} from "@mui/material/styles";
import {MilestoneTimelineTooltip} from ".";

const TimelineMilestone = styled("li")(({phase, milestone, date, theme}) => ({
    display: "inline-block",
    width: "20px",
    height: "20px",
    [theme.breakpoints.up("md")]: {
        margin: "0 18px",
    },
    [theme.breakpoints.up("lg")]: {
        margin: "0 29px",
    },
    [theme.breakpoints.up("xl")]: {
        margin: "0 40px",
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
    boxShadow:
        "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
    "&:last-child": {
        "&:after": {
            display: "inline-block",
            [theme.breakpoints.down("lg")]: {
                display: "none",
            },
            position: "absolute",
            bottom: "0",
            width: "80px",
            [theme.breakpoints.up("xl")]: {
                width: "100px",
            },
            marginBottom: "-10px",
            transform: "translate(-50%, 100%)",
            content: `"${milestone}"`,
        },
    },
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
