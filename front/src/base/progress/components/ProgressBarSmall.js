import {theme} from "Theme";
import {FieldUtil} from "base/ui/section/utilities";
import {ProgressUtil} from "../utilities";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const ProgressBarSmall = ({label = "", progressValue, progressStyle = {}}) => {
    const barProgress = progressValue >= 100 ? 100 : progressValue;

    return (
        <>
            {label ? (
                <Typography
                    component="span"
                    variant="body2"
                    color={theme.palette.grey[600]}
                    lineHeight={1}
                >
                    {label}:
                    <span style={{fontWeight: 500}}>
                        {" "}
                        {FieldUtil.getValue(progressValue, "%")}
                    </span>
                </Typography>
            ) : null}
            <Tooltip title={!label ? `${progressValue}%` : null}>
                <LinearProgress
                    variant="determinate"
                    valueBuffer={progressValue}
                    value={barProgress}
                    aria-valuenow={progressValue}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    color={ProgressUtil.getProgressColor(progressValue)}
                    sx={{
                        height: 10,
                        borderRadius: 4,
                        ...progressStyle,
                    }}
                />
            </Tooltip>
        </>
    );
};

export default ProgressBarSmall;
