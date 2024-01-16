import {theme} from "Theme";
import {ProgressUtil} from "../utilities";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const ProgressBar = ({label = "", progressValue}) => {
    const tagPosition =
        progressValue >= 100
            ? `translateX(50%)`
            : `translateX(calc(${progressValue}% - 3px))`;

    const barProgress = progressValue >= 100 ? 100 : progressValue;

    return (
        <>
            {label ? (
                <Typography
                    component="span"
                    variant="overline"
                    fontSize={16}
                    color={theme.palette.grey[600]}
                    lineHeight={1}
                >
                    {label}
                </Typography>
            ) : null}
            <Typography
                component="span"
                display="block"
                variant="overline"
                fontSize={16}
                fontWeight={500}
                color={theme.palette.grey[600]}
                lineHeight={1}
                sx={{
                    transform: tagPosition,
                }}
            >
                {progressValue}%
            </Typography>
            <Tooltip title={`${progressValue}%`}>
                <LinearProgress
                    valueBuffer={progressValue}
                    variant="determinate"
                    value={barProgress}
                    aria-valuenow={progressValue}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    color={ProgressUtil.getProgressColor(progressValue)}
                    sx={{
                        mt: "6px",
                        height: 12,
                        borderRadius: 4,
                    }}
                />
            </Tooltip>
        </>
    );
};

export default ProgressBar;
