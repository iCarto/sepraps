import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const AddNewInlineItemButton = ({label, onClick}) => (
    <Grid container justifyContent="center">
        <IconButton
            aria-label="add-new-button"
            color="primary"
            size="large"
            onClick={onClick}
        >
            <Tooltip id="add-new-button-tooltip" title={label}>
                <AddCircleOutlineOutlinedIcon fontSize="inherit" />
            </Tooltip>
        </IconButton>
    </Grid>
);

export default AddNewInlineItemButton;
