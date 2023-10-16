import Chip from "@mui/material/Chip";

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
    } else if (value === "sin_valorar") {
        return <HelpOutlineOutlinedIcon sx={{color: "grey"}} />;
    }
    return null;
};

const PaymentAppraisalChip = ({label, value}) => (
    <Chip
        label={label}
        color={getAppraisalColor(value)}
        icon={getAppraisalIcon(value)}
        variant="outlined"
    />
);

export {PaymentAppraisalChip as default, getAppraisalIcon};
