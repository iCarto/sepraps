import {useList} from "../hooks";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const EntityChangeView = ({views = null}) => {
    const {view, setView} = useList();

    const handleChange = (event, selectedOption) => {
        console.log({selectedOption});
        setView(selectedOption);
    };

    console.log({views, view});

    return (
        views?.length && (
            <ToggleButtonGroup
                color="primary"
                value={view}
                exclusive
                onChange={handleChange}
            >
                {views?.includes("table") && (
                    <ToggleButton value="table">
                        <FormatListBulletedOutlinedIcon fontSize="small" />
                    </ToggleButton>
                )}
                {views?.includes("list") && (
                    <ToggleButton value="list">
                        <GridViewOutlinedIcon fontSize="small" />
                    </ToggleButton>
                )}
                {views?.includes("map") && (
                    <ToggleButton value="map">
                        <MapOutlinedIcon fontSize="small" />
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
        )
    );
};

export default EntityChangeView;
