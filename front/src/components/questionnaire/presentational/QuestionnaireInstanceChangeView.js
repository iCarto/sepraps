import {useQuestionnaireInstanceView} from "../provider";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

const QuestionnaireInstanceChangeView = () => {
    const {view, setView} = useQuestionnaireInstanceView();

    const handleChange = (event, selectedOption) => setView(selectedOption);

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
        </ToggleButtonGroup>
    );
};

export default QuestionnaireInstanceChangeView;
