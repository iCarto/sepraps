import {useState} from "react";

import {NumberHelperDialog} from ".";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

const NumberHelperDialogWidget = ({onSelectNumber, calculatorOptions}) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <Tooltip title="Calculadora de números">
                <IconButton onClick={() => setDialogOpen(true)}>
                    <CalculateOutlinedIcon sx={{fontSize: 20, color: "grey.400"}} />
                </IconButton>
            </Tooltip>
            <NumberHelperDialog
                isDialogOpen={isDialogOpen}
                onAcceptDialog={onSelectNumber}
                onCloseDialog={() => setDialogOpen(false)}
                calculatorOptions={calculatorOptions}
            />
        </>
    );
};

export default NumberHelperDialogWidget;
