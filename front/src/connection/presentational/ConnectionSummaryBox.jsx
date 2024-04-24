import {theme} from "Theme";
import {NumberUtil} from "base/format/utilities";
import {ContainerGridWithBorder} from "base/ui/section/components";
import {SimplePieChart} from "base/chart/components";
import {LightHeading} from "base/ui/headings/components";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ConnectionSummaryBox = ({connection}) => {
    return (
        <ContainerGridWithBorder>
            <Grid item xs={9} pl="1rem">
                <LightHeading>Conexiones reales/previstas</LightHeading>
                <Stack direction="row" alignItems="baseline">
                    <Typography component="span" fontSize={42}>
                        {connection?.number_of_actual_connections || 0}
                    </Typography>
                    <Typography
                        component="span"
                        fontSize={36}
                        ml={1}
                        color={theme.palette.grey[600]}
                    >
                        /{connection?.number_of_planned_connections || 0} conexiones
                    </Typography>
                </Stack>
            </Grid>
            <Grid item container xs={3} justifyContent="center" alignItems="center">
                <SimplePieChart
                    percentageValue={NumberUtil.formatDecimalWithoutZeros(
                        connection?.connected_households_percentage,
                        1
                    )}
                    percentageLabel="Viviendas conect."
                    colorNameSecondary="post-execution"
                    colorNamePrimary="post-execution"
                />
            </Grid>
        </ContainerGridWithBorder>
    );
};

export default ConnectionSummaryBox;
