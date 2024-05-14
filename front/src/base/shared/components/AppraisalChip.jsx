import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

const getAppraisalColor = value => {
    if (value === "mal") {
        return "error";
    } else if (value === "regular") {
        return "warning";
    } else if (value === "bien") {
        return "success";
    }
    return "default";
};

const getAppraisalIcon = value => {
    if (value === "mal") {
        return <CancelOutlinedIcon sx={{color: `${getAppraisalColor(value)}.main`}} />;
    } else if (value === "regular") {
        return (
            <ErrorOutlineOutlinedIcon
                sx={{color: `${getAppraisalColor(value)}.main`}}
            />
        );
    } else if (value === "bien") {
        return (
            <CheckCircleOutlineOutlinedIcon
                sx={{color: `${getAppraisalColor(value)}.main`}}
            />
        );
    }
    return <HelpOutlineOutlinedIcon sx={{color: "grey"}} />;
};

const AppraisalChip = ({hideLabel = false, label = "", value}) => {
    return !hideLabel ? (
        <Chip
            label={!hideLabel ? label || "Sin valorar" : null}
            color={getAppraisalColor(value)}
            icon={getAppraisalIcon(value)}
            variant="outlined"
        />
    ) : (
        <Tooltip title={`Valoración: ${value?.toUpperCase() || "Sin valorar"}`}>
            {getAppraisalIcon(value)}
        </Tooltip>
    );
};
export {AppraisalChip as default, getAppraisalIcon, getAppraisalColor};
