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
    QuestionnaireMonthlylBarChart,
} from "questionnaire/presentational/charts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuestionnaireExpectedVsRealFieldChart = ({field, data}) => {
    const [chartType, setChartType] = useState("values_acc");
    const [chartPercentage, setChartPercentage] = useState("abs");

    const handleChangeChartType = event => {
        setChartType(event.target.value);
    };

    const handleChangeChartPercentage = event => {
        setChartPercentage(event.target.value);
    };

    const getChart = chartType => {
        if (chartType === "values") {
            return (
                <QuestionnaireMonthlylBarChart
                    field={field}
                    data={data}
                    showPercentage={chartPercentage === "perc"}
                />
            );
        }
        if (chartType === "values_acc") {
            return (
                <QuestionnaireAccumulatedLineChart
                    field={field}
                    data={data}
                    showPercentage={chartPercentage === "perc"}
                />
            );
        }
        if (chartType === "variation") {
            return (
                <QuestionnaireDeviationBarChart
                    field={field}
                    data={data}
                    showPercentage={chartPercentage === "perc"}
                />
            );
        }
        return null;
    };

    return (
        <Grid container justifyContent="flex-end" spacing={3}>
            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel id="chart-type-select-label">Mostrar</InputLabel>
                    <Select
                        labelId="chart-type-select-label"
                        id="chart-type-select"
                        value={chartType}
                        label="Mostrar"
                        onChange={handleChangeChartType}
                    >
                        <MenuItem value={"values"}>Mensual</MenuItem>
                        <MenuItem value={"values_acc"}>Acumulado</MenuItem>
                        <MenuItem value={"variation"}>Variación</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl fullWidth>
                    <Select
                        labelId="chart-perc-select-label"
                        id="chart-perc-select"
                        value={chartPercentage}
                        onChange={handleChangeChartPercentage}
                    >
                        <MenuItem value={"abs"}>Absoluto</MenuItem>
                        <MenuItem value={"perc"}>Porcentaje (%)</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {getChart(chartType)}
            </Grid>
        </Grid>
    );
};

export default QuestionnaireExpectedVsRealFieldChart;
