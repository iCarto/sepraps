import {useFolderView} from "../provider";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

const FolderChangeView = () => {
    const {view, setView} = useFolderView();

    const handleChange = (event, selectedOption) => setView(selectedOption);

    return (
        <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value="list">
                <FormatListBulletedOutlinedIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="detail">
                <GridViewOutlinedIcon fontSize="small" />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default FolderChangeView;
