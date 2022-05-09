import {useContractListView} from "../provider";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";

const ContractListChangeView = () => {
    const {view, setView} = useContractListView();

    const handleChange = (event, selectedOption) => setView(selectedOption);

    return (
        <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value="list">
                <GridViewOutlinedIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="table">
                <FormatListBulletedOutlinedIcon fontSize="small" />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default ContractListChangeView;
