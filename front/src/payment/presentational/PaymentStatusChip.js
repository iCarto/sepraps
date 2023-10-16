import Chip from "@mui/material/Chip";

import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import MoneyOffOutlinedIcon from "@mui/icons-material/MoneyOffOutlined";

const getStatusColor = value => {
    if (value === "no_pagado") {
        return "error";
    } else if (value === "pagado") {
        return "success";
    }
    return null;
};

const getStatusIcon = value => {
    if (value === "no_pagado") {
        return <MoneyOffOutlinedIcon sx={{color: `${getStatusColor(value)}.main`}} />;
    } else if (value === "pagado") {
        return (
            <AttachMoneyOutlinedIcon sx={{color: `${getStatusColor(value)}.main`}} />
        );
    }
    return null;
};

const PaymentStatusChip = ({label, value}) => (
    <Chip label={label} color={getStatusColor(value)} icon={getStatusIcon(value)} />
);

export {PaymentStatusChip as default, getStatusIcon};
