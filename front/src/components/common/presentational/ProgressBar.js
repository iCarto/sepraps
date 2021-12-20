import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";

const ProgressBar = ({barPhase}) => {
    let barValue = 0;
    let barColor;

    switch (`${barPhase}`) {
        case "Diseño":
            barValue = 20;
            barColor = "warning";
            break;
        case "Ejecución":
            barValue = 50;
            barColor = "info";
            break;
        case "Post-Construcción":
            barValue = 100;
            barColor = "success";
            break;
        default:
            barValue = 0;
            barColor = "primary";
            break;
    }

    return (
        <Tooltip title={`Fase: ${barPhase}`}>
            <LinearProgress
                variant="determinate"
                value={barValue}
                aria-valuenow={barValue}
                aria-valuemin={0}
                aria-valuemax={100}
                color={barColor}
                sx={{
                    height: 12,
                    borderRadius: 4,
                }}
            />
        </Tooltip>
    );
};

ProgressBar.propTypes = {
    barPhase: PropTypes.string.isRequired,
};

export default ProgressBar;
