import {useNavigate} from "react-router-dom";
import {useAuth} from "auth";
import {DateUtil} from "utilities";

import Typography from "@mui/material/Typography";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import styled from "@mui/material/styles/styled";

const MilestoneTimelineDot = styled(TimelineDot, {
    shouldForwardProp: prop => prop !== "current",
})(({milestone, current = false, disabled = false, theme}) => ({
    width: "35px",
    height: "35px",
    backgroundColor:
        !disabled && !current ? theme.palette[milestone.phase].main : "inherit",
    border:
        "2px solid " + (!disabled ? theme.palette[milestone.phase].dark : "inherit"),
}));

const MilestonePoint = ({milestone, level, activeMilestone, isFirst, isLast}) => {
    const navigate = useNavigate();
    const {ROLES, hasRole} = useAuth();

    const handleClick = () => {
        const hasEditPermission = [ROLES.EDIT, ROLES.MANAGEMENT].some(role =>
            hasRole(role)
        );
        if (hasEditPermission && milestone.code === activeMilestone?.code) {
            navigate(`${milestone.id}/edit`);
        } else {
            navigate(`${milestone.id}`);
        }
    };

    const getTimelineDot = () => {
        if (milestone.code === activeMilestone?.code) {
            return (
                <MilestoneTimelineDot
                    variant="outlined"
                    milestone={milestone}
                    current={true}
                ></MilestoneTimelineDot>
            );
        } else if (milestone.compliance_date) {
            return <MilestoneTimelineDot milestone={milestone}></MilestoneTimelineDot>;
        }
        return (
            <MilestoneTimelineDot
                variant="outlined"
                milestone={milestone}
                disabled={true}
            ></MilestoneTimelineDot>
        );
    };

    const isDisabled = () => {
        return (
            milestone.code !== activeMilestone?.code &&
            milestone.compliance_date === null
        );
    };

    return (
        <TimelineItem
            onClick={() => {
                if (!isDisabled()) {
                    handleClick();
                }
            }}
            sx={{
                cursor: !isDisabled() ? "pointer" : "inherit",
            }}
        >
            <TimelineOppositeContent
                sx={{m: "auto 0", flex: 0.25}}
                align="right"
                variant="body2"
                color="text.secondary"
            >
                {DateUtil.formatDate(milestone.compliance_date)}
            </TimelineOppositeContent>
            <TimelineSeparator>
                {!isFirst && <TimelineConnector />}
                {getTimelineDot()}
                {!isLast && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent sx={{m: "auto 0"}}>
                <Typography color={isDisabled() ? "grey.500" : "inherit"}>
                    {milestone.name}
                </Typography>
            </TimelineContent>
        </TimelineItem>
    );
};

export default MilestonePoint;
