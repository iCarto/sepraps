import {cloneElement} from "react";

import {
    COMPONENT_EXECUTION_STATUS_IN_PROGRESS,
    COMPONENT_EXECUTION_STATUS_COMPLETED,
} from "component/config";

import Chip from "@mui/material/Chip";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircledIcon from "@mui/icons-material/CheckCircle";
import TimelapseOutlinedIcon from "@mui/icons-material/TimelapseOutlined";
import TimelapseIcon from "@mui/icons-material/Timelapse";

const getStatusColor = value => {
    if (value === COMPONENT_EXECUTION_STATUS_IN_PROGRESS) {
        return "warning";
    } else if (value === COMPONENT_EXECUTION_STATUS_COMPLETED) {
        return "success";
    }
    return "default";
};

const getStatusIcon = (value, outlined = false) => {
    let color = "grey.400";
    if (value === COMPONENT_EXECUTION_STATUS_IN_PROGRESS) {
        color = "warning.main";
    }
    if (value === COMPONENT_EXECUTION_STATUS_COMPLETED) {
        color = "success.main";
    }

    const outlinedIcon =
        value === COMPONENT_EXECUTION_STATUS_COMPLETED ? (
            <CheckCircleOutlineOutlinedIcon />
        ) : (
            <TimelapseOutlinedIcon />
        );
    const filledIcon =
        value === COMPONENT_EXECUTION_STATUS_COMPLETED ? (
            <CheckCircledIcon />
        ) : (
            <TimelapseIcon />
        );

    const icon = outlined ? outlinedIcon : filledIcon;

    return cloneElement(icon, {
        sx: {color},
    });
};

const ComponentStatusChip = ({label, value}) => (
    <Chip label={label} color={getStatusColor(value)} icon={getStatusIcon(value)} />
);

export {ComponentStatusChip as default, getStatusIcon};
