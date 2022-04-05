import {useStatsView} from "../provider";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const StatsChangeView = () => {
    const {view, setView} = useStatsView();

    const handleChange = (event, selectedOption) => {
        setView(oldSelectedView => {
            if (!selectedOption) {
                return oldSelectedView;
            }
            return selectedOption;
        });
    };

    return (
        <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value="chart">
                <BarChartIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="table">
                <TableChartOutlinedIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="map">
                <MapOutlinedIcon fontSize="small" />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default StatsChangeView;
