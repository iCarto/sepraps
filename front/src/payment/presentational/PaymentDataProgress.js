import {NumberUtil} from "base/format/utilities";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {theme} from "Theme";

const PaymentDataProgress = ({label, value}) => {
    const percentage = {
        label: label,
        value: value,
    };

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
                        percentage.value > 100
                            ? theme.palette.error.dark
                            : theme.palette["monto-total"].lighter,
                }}
            />
            <CircularProgress
                variant="determinate"
                value={percentage.value}
                size={120}
                thickness={5}
                sx={{color: theme.palette["expected"].main}}
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
                    <Typography component="span" fontSize="1.6em" lineHeight={0}>
                        {NumberUtil.formatInteger(percentage.value)}
                    </Typography>
                    <Typography component="span">%</Typography>
                </Box>

                <Typography
                    component="span"
                    variant="overline"
                    lineHeight={1}
                    fontSize="10px"
                >
                    {percentage.label || ""}
                </Typography>
            </Stack>
        </div>
    );
};

export default PaymentDataProgress;
