import {Fragment} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {DateUtil} from "utilities";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import PendingIcon from "@mui/icons-material/Pending";
import Typography from "@mui/material/Typography";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import {useColorMilestone} from "../hooks";

const MilestonePoint = ({
    milestone,
    level,
    isFirst,
    isLast,
    isActiveMilestone = false,
}) => {
    const navigate = useNavigate();
    const getMilestoneColor = useColorMilestone();
    let project;
    [project] = useOutletContext();

    const handleClick = () => {
        if (isActiveMilestone) {
            navigate(`/projects/${project.id}/milestones/${milestone.id}/edit`);
        } else {
            navigate(`/projects/${project.id}/milestones/${milestone.id}`);
        }
    };

    const getTimelineDot = () => {
        const color = getMilestoneColor(milestone.category);
        if (isActiveMilestone) {
            return (
                <TimelineDot variant="outlined">
                    <PendingIcon sx={{color: color}} />
                </TimelineDot>
            );
        } else if (milestone.compliance_date) {
            return (
                <TimelineDot sx={{backgroundColor: color}}>
                    <CheckCircleIcon />
                </TimelineDot>
            );
        }
        return (
            <TimelineDot variant="outlined">
                <CircleIcon color="disabled" />
            </TimelineDot>
        );
    };

    const isDisabled = () => {
        return (
            milestone.category !== project.active_milestone.category &&
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
                    {milestone.category_name}
                </Typography>
            </TimelineContent>
        </TimelineItem>
    );
};

export default MilestonePoint;
