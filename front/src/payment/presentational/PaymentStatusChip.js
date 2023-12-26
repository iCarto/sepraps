import Chip from "@mui/material/Chip";

import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import {cloneElement} from "react";
import {PRODUCT_STATUS_REJECTED, PRODUCT_STATUS_PAID} from "payment/model";

const getStatusColor = value => {
    if (value === PRODUCT_STATUS_REJECTED) {
        return "error";
    } else if (value === PRODUCT_STATUS_PAID) {
        return "success";
    }
    return "default";
};

const getStatusIcon = (value, outlined = false) => {
    let color = "grey.400";
    if (value === PRODUCT_STATUS_REJECTED) {
        color = "error.main";
    }
    if (value === PRODUCT_STATUS_PAID) {
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
