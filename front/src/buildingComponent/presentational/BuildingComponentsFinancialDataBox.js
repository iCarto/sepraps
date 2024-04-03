import {NumberUtil} from "base/format/utilities";
import {CURRENCY_SYMBOL} from "base/format/config/i18n";

import {theme} from "Theme";
import {SimplePieChart} from "base/chart/components";
import {ContainerGridWithBorder} from "base/ui/section/components";
import {LightHeading} from "base/ui/headings/components";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const BuildingComponentsFinancialDataBox = ({
    headline,
    mainValues,
    subheading,
    percentage,
    colorNameSecondary,
    colorNamePrimary,
}) => {
    return (
        <ContainerGridWithBorder>
            <Grid item xs={9} pl="1rem">
                <LightHeading>{headline}</LightHeading>
                <Stack direction="row" alignItems="baseline">
                    <Typography component="span" fontSize={34}>
                        {NumberUtil.formatMillions(mainValues.first)}
                        <Typography component="span" fontSize={12}>
                            {CURRENCY_SYMBOL}
                        </Typography>
                    </Typography>
                    <Typography
                        component="span"
                        fontSize={24}
                        ml={1}
                        color={theme.palette.grey[600]}
                    >
                        / {NumberUtil.formatMillions(mainValues.second)}
                        <Typography component="span" fontSize={12}>
                            {CURRENCY_SYMBOL}
                        </Typography>
                    </Typography>
                </Stack>
                {subheading}
            </Grid>
            <Grid item container xs={3} justifyContent="flex-start" alignItems="center">
                <SimplePieChart
                    percentageValue={percentage.value}
                    percentageLabel={percentage.label}
                    colorNameSecondary={colorNameSecondary}
                    colorNamePrimary={colorNamePrimary}
                />
            </Grid>
        </ContainerGridWithBorder>
    );
};

export default BuildingComponentsFinancialDataBox;
