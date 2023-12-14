import {NumberUtil} from "base/format/utilities";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";

import {theme} from "Theme";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const BuildingComponentsRealDataSubheading = ({data}) => {
    const pendingPercentage = NumberUtil.formatDecimal(
        (data.pending_amount / data.real_amount) * 100,
        0
    );
    return (
        <Stack direction="row" alignItems="center">
            <Typography fontSize={18}>
                <Typography component="span" fontWeight={600} fontSize={18}>
                    {NumberUtil.formatMillions(data.pending_amount)}
                </Typography>{" "}
                {CURRENCY_SYMBOL} pendiente{" "}
                {/* <Typography
                    component="span"
                    color={theme.palette.pending.dark}
                    fontSize={18}
                    lineHeight={1}
                >
                    {pendingPercentage || 0}%
                </Typography> */}
            </Typography>
            <Chip
                label={`${pendingPercentage || 0}%`}
                sx={{
                    marginLeft: 1,
                    color: theme.palette.pending.dark,
                    borderColor: theme.palette.pending.main,
                }}
                size="small"
                variant="outlined"
            />
        </Stack>
    );
};

export default BuildingComponentsRealDataSubheading;
