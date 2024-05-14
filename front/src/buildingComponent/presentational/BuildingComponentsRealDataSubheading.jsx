import {NumberUtil} from "base/format/utilities";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";

import {theme} from "Theme";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const BuildingComponentsRealDataSubheading = ({data}) => {
    return (
        <Stack direction="row" alignItems="center">
            <Chip
                label={
                    <Typography fontSize={14}>
                        Pendiente{" "}
                        <Typography component="span" fontWeight={600} fontSize={14}>
                            {NumberUtil.formatMillions(data.pending_amount)}{" "}
                            {CURRENCY_SYMBOL}
                        </Typography>{" "}
                    </Typography>
                }
                size="small"
                variant="outlined"
                sx={{
                    color: theme.palette.pending.dark,
                    borderColor: theme.palette.pending.dark,
                }}
            />
        </Stack>
    );
};

export default BuildingComponentsRealDataSubheading;
