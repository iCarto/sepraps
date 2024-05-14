import {useFolderView} from "../provider";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

const FolderChangeViewButtonGroup = () => {
    const {view, setView} = useFolderView();

    const handleChange = (event, selectedOption) => setView(selectedOption);

    return (
        <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value="table">
                <FormatListBulletedOutlinedIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="list">
                <GridViewOutlinedIcon fontSize="small" />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default FolderChangeViewButtonGroup;
