import {theme} from "Theme";
import Chip from "@mui/material/Chip";

const ContractServiceChip = ({service: label}) => {
    return (
        <Chip
            size="small"
            label={label}
            sx={{
                border: 1,
                borderColor: theme.palette.secondary.light,
                bgcolor: theme.palette.primary.light,
                color: "white",
            }}
        />
    );
};

export default ContractServiceChip;
