import {DateUtil} from "utilities";
import styled from "@mui/material/styles/styled";
import makeStyles from "@mui/material/styles/makeStyles";
import {MilestoneTimelineTooltip} from ".";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const MilestoneBox = styled("div")(({theme}) => ({
    textAlign: "center",
    position: "relative",
    "&:before": {
        content: '""',
        position: "absolute",
        top: "50%",
        left: 0,
        borderTop: `1px solid ${theme.palette["grey"]["400"]}`,
        background: theme.palette["grey"]["400"],
        width: "100%",
        transform: "translateY(-50%)",
    },
}));

const MilestoneCircleDiv = styled("div", {
    shouldForwardProp: prop => prop !== "milestone",
})(({milestone, theme}) => ({
    display: "inline-block",
    width: "20px",
    height: "20px",
    minWidth: "20px",
    minHeight: "20px",
    borderRadius: "50%",
    zIndex: "100",
    border: `2px solid ${theme.palette[milestone.phase].main}`,
    background: "white",
    ...(milestone.compliance_date && {
        border: `2px solid ${theme.palette[milestone.phase].dark}`,
        background: `${theme.palette[milestone.phase].main}`,
    }),
}));

const MilestoneTimelineShort = ({milestones}) => {
    return (
        <MilestoneBox>
            <Stack direction="row" justifyContent="space-around">
                {milestones.map(milestone => {
                    return (
                        <MilestoneTimelineTooltip
                            key={milestone.category}
                            milestone={milestone.category_name}
                            completionDate={DateUtil.formatDate(
                                milestone.compliance_date
                            )}
                        >
                            <MilestoneCircleDiv milestone={milestone} />
                        </MilestoneTimelineTooltip>
                    );
                })}
            </Stack>
        </MilestoneBox>
    );
};

export default MilestoneTimelineShort;