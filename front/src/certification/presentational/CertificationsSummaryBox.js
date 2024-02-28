import {CURRENCY_SYMBOL} from "base/format/config/i18n";
import {theme} from "Theme";

import {NumberUtil} from "base/format/utilities";

import {SimplePieChart} from "base/chart/components";
import {ContainerGridWithBorder} from "base/ui/section/components";
import {LightHeading} from "base/ui/headings/components";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const getTotal = (items, totalColumn) => {
    return items
        .map(item => parseInt(item[totalColumn]))
        .reduce((sum, i) => sum + i, 0);
};

const CertificationsSummaryBox = ({certifications, contract}) => {
    const total = getTotal(certifications, "approved_amount");
    const percentage = (total / contract?.total_amount_approved) * 100 || 0;

    return (
        <ContainerGridWithBorder>
            <Grid item xs={9} pl="1rem">
                <LightHeading>
                    Monto aprobado del proyecto <br /> vs. contrato
                </LightHeading>
                <Stack direction="row" alignItems="baseline">
                    <Typography component="span" fontSize={34}>
                        {NumberUtil.formatInteger(total)}{" "}
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
                        /{" "}
                        {NumberUtil.formatMillions(
                            contract?.total_amount_approved || 0
                        )}{" "}
                        <Typography component="span" fontSize={12}>
                            {CURRENCY_SYMBOL}
                        </Typography>
                    </Typography>
                </Stack>
            </Grid>

            <Grid item container xs={3} justifyContent="flex-start" alignItems="center">
                <SimplePieChart
                    percentageValue={NumberUtil.formatDecimalWithoutZeros(percentage)}
                    colorNameSecondary="paid"
                    colorNamePrimary="paid"
                />
            </Grid>
        </ContainerGridWithBorder>
    );
};

export default CertificationsSummaryBox;
