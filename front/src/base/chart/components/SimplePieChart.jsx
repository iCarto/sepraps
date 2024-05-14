import {theme} from "Theme";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const SimplePieChart = ({
    percentageValue,
    percentageLabel = "",
    colorNameSecondary,
    colorNamePrimary,
}) => {
    return (
        <div style={{position: "relative"}}>
            <CircularProgress
                variant="determinate"
                value={100}
                size={120}
                thickness={5}
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    color:
                        percentageValue > 100
                            ? theme.palette.error.dark
                            : theme.palette[colorNameSecondary].lighter,
                }}
            />
            <CircularProgress
                variant="determinate"
                value={parseInt(percentageValue)}
                size={120}
                thickness={5}
                sx={{color: theme.palette[colorNamePrimary].main}}
            />
            <Stack
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -60%)",
                    mt: "6px",
                    alignItems: "center",
                }}
            >
                <Box>
                    <Typography component="span" fontSize="2em" lineHeight={0}>
                        {percentageValue}
                    </Typography>
                    <Typography component="span">%</Typography>
                </Box>

                <Typography
                    component="span"
                    variant="overline"
                    textAlign="center"
                    lineHeight={1}
                >
                    {percentageLabel}
                </Typography>
            </Stack>
        </div>
    );
};

export default SimplePieChart;
