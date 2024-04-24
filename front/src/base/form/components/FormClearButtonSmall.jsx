import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const FormClearButtonSmall = ({handleClear}) => {
    return (
        <IconButton aria-label="clear-filter" size="large" onClick={handleClear}>
            <Tooltip id="clear-filter-tooltip" title="Borrar filtros">
                <CancelOutlinedIcon fontSize="inherit" />
            </Tooltip>
        </IconButton>
    );
};

export default FormClearButtonSmall;
