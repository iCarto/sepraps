import {useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    BarElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Grid from "@mui/material/Grid";
import {
    QuestionnaireAccumulatedLineChart,
    QuestionnaireDeviationBarChart,
    QuestionnaireTotalBarChart,
} from "components/questionnaire/presentational/charts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuestionnaireExpectedVsRealFieldChart = ({field, data}) => {
    const [chartType, setChartType] = useState("values_acc");

    const handleChange = event => {
        setChartType(event.target.value);
    };

    console.log({data});

    return (
        <Grid container justifyContent="flex-end" spacing={3}>
            {/*<Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel id="chart-type-select-label">Mostrar</InputLabel>
                    <Select
                        labelId="chart-type-select-label"
                        id="chart-type-select"
                        value={chartType}
                        label="Mostrar"
                        onChange={handleChange}
                    >
                        <MenuItem value={"values"}>Total</MenuItem>
                        <MenuItem value={"values_perc"}>Total (%)</MenuItem>
                        <MenuItem value={"values_acc"}>Acumulado</MenuItem>
                        <MenuItem value={"values_acc_perc"}>Acumulado (%)</MenuItem>
                        <MenuItem value={"variation"}>Variación</MenuItem>
                        <MenuItem value={"variation_perc"}>Variación (%)</MenuItem>
                    </Select>
                </FormControl>
    </Grid>*/}
            <Grid item xs={12}>
                <QuestionnaireAccumulatedLineChart field={field} data={data} />
            </Grid>
            <Grid item xs={field.include_expected_value === true ? 6 : 12}>
                <QuestionnaireTotalBarChart field={field} data={data} />
            </Grid>
            {field.include_expected_value === true && (
                <Grid item xs={6}>
                    <QuestionnaireDeviationBarChart field={field} data={data} />
                </Grid>
            )}
        </Grid>
    );
};

export default QuestionnaireExpectedVsRealFieldChart;
