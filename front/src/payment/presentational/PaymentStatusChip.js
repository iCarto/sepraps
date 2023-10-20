import Chip from "@mui/material/Chip";

import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import {cloneElement} from "react";

const getStatusColor = value => {
    if (value === "anulado") {
        return "error";
    } else if (value === "pagado") {
        return "success";
    }
    return "default";
};

const getStatusIcon = (value, outlined = false) => {
    let color = "grey.400";
    if (value === "anulado") {
        color = "error.main";
    }
    if (value === "pagado") {
        color = "success.main";
    }
    const icon = outlined ? <PaidOutlinedIcon /> : <PaidIcon />;

    return cloneElement(icon, {
        sx: {color},
    });
};

const PaymentStatusChip = ({label, value}) => (
    <Chip label={label} color={getStatusColor(value)} icon={getStatusIcon(value)} />
);

export {PaymentStatusChip as default, getStatusIcon};
