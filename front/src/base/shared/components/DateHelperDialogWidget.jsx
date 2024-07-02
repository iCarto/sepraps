import {useState} from "react";

import {DateHelperDialog} from ".";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

const DateHelperDialogWidget = ({onSelectDate}) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <Tooltip title="Calculadora de fechas">
                <IconButton onClick={() => setDialogOpen(true)}>
                    <CalculateOutlinedIcon sx={{fontSize: 20, color: "grey.400"}} />
                </IconButton>
            </Tooltip>
            <DateHelperDialog
                isDialogOpen={isDialogOpen}
                onAcceptDialog={onSelectDate}
                onCloseDialog={() => setDialogOpen(false)}
            />
        </>
    );
};

export default DateHelperDialogWidget;
