import {theme} from "Theme";
import {ProgressUtil} from "../utilities";
import {FieldUtil} from "base/ui/section/utilities";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const ProgressBar = ({label = "", progressValue}) => {
    const tagPosition =
        progressValue >= 100
            ? `translateX(50%)`
            : `translateX(calc(${progressValue}% - 3px))`;

    const parsedValue = parseInt(progressValue) || 0;
    const barProgress = parsedValue >= 100 ? 100 : parsedValue;

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
                {FieldUtil.getValue(progressValue, "%")}
            </Typography>
            <Tooltip title={FieldUtil.getValue(progressValue, "%")}>
                <LinearProgress
                    valueBuffer={parsedValue}
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
