import {Fragment} from "react";
import {theme} from "Theme";
import {NumberUtil} from "base/format/utilities";
import {SimplePieChart} from "base/chart/components";
import {ContainerGridWithBorder} from "base/ui/section/components";
import {LightHeading} from "base/ui/headings/components";

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
            <Grid item container xs={9} columnSpacing={1} pl={5} alignItems="baseline">
                {summaryData.map((item, index) => (
                    <Fragment key={index}>
                        <Grid item xs={2}>
                            <Typography
                                fontSize={36}
                                color={theme.palette.text.primary}
                                textAlign="end"
                            >
                                {NumberUtil.formatInteger(item.value)}
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <LightHeading>{item.label}</LightHeading>
                        </Grid>
                    </Fragment>
                ))}
            </Grid>
            <Grid item container xs={3} justifyContent="center" alignItems="center">
                <SimplePieChart
                    percentageLabel="Mujeres"
                    colorNamePrimary="gender1"
                    colorNameSecondary="gender1"
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
