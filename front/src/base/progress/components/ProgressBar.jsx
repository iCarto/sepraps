import {theme} from "Theme";
import {NumberUtil} from "base/format/utilities";
import {FieldUtil} from "base/ui/section/utilities";
import {ProgressUtil} from "../utilities";
import {LightHeading} from "base/ui/headings/components";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const ProgressBar = ({label = "", tooltipLabel = null, progressValue}) => {
    const getTagPosition = () => {
        if (progressValue >= 100) return `translateX(50%)`;
        else if (progressValue >= 90 && progressValue < 100)
            return `translateX(calc(${progressValue}% - 48px))`;
        else return `translateX(calc(${progressValue}% - 3px))`;
    };
    const tagPosition = getTagPosition();

    const formattedValue = NumberUtil.formatDecimalWithoutZeros(progressValue) || 0;
    const barProgress = progressValue >= 100 ? 100 : progressValue;

    return (
        <>
            {label ? <LightHeading>{label}</LightHeading> : null}
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
                {FieldUtil.getValue(formattedValue, "%")}
            </Typography>
            <Tooltip title={tooltipLabel || FieldUtil.getValue(formattedValue, "%")}>
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
