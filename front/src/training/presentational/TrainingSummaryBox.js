import {Fragment} from "react";
import {theme} from "Theme";
import {NumberUtil} from "base/format/utilities";
import {SimplePieChart} from "base/chart/components";
import {ContainerGridWithBorder} from "base/ui/section/components";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const TrainingSummaryBox = ({trainingsTotals}) => {
    const summaryData = [
        {
            label: "capacitaciones/asistencias técnicas",
            value: parseInt(trainingsTotals?.number_of_trainings),
        },
        {
            label: "participantes",
            value: parseInt(trainingsTotals?.number_of_participants),
        },
    ];

    return (
        <ContainerGridWithBorder>
            <Grid item container xs={9} columnSpacing={1} pl={5}>
                {summaryData.map((item, index) => (
                    <Fragment key={index}>
                        <Grid item container xs={2} justifyContent="flex-end">
                            <Typography
                                component="span"
                                fontSize={36}
                                color={theme.palette.text.primary}
                            >
                                {NumberUtil.formatInteger(item.value)}
                            </Typography>
                        </Grid>
                        <Grid item container xs={10} alignItems="flex-end">
                            <Typography
                                component="span"
                                variant="overline"
                                fontSize={16}
                                color={theme.palette.grey[600]}
                            >
                                {item.label}
                            </Typography>
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
            <Grid item container xs={3} justifyContent="center" alignItems="center">
                <SimplePieChart
                    percentageLabel="Mujeres"
                    colorNameSecondary="primary"
                    colorNamePrimary="warning"
                    percentageValue={NumberUtil.formatDecimalWithoutZeros(
                        trainingsTotals.women_percentage,
                        1
                    )}
                />
            </Grid>
        </ContainerGridWithBorder>
    );
};

export default TrainingSummaryBox;
