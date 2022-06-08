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
import {LineChart} from "components/common/chart";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuestionnaireExpectedVsRealFieldChart = ({fieldLabel, data}) => {
    const [chartType, setChartType] = useState("values_acc");

    const handleChange = event => {
        setChartType(event.target.value);
    };

    const datasets = chartType.startsWith("variation")
        ? [
              {
                  label: "Variación",
                  data: data[chartType],
                  borderColor: "rgb(239, 163, 54)",
                  backgroundColor: "rgba(239, 163, 54, 0.5)",
              },
          ]
        : [
              {
                  label: "Previsto",
                  data: data["expected_" + chartType],
                  borderColor: "rgb(239, 163, 54)",
                  backgroundColor: "rgba(239, 163, 54, 0.5)",
              },
              {
                  label: "Ejecutado",
                  data: data["real_" + chartType],
                  borderColor: "rgb(2, 94, 170)",
                  backgroundColor: "rgba(2, 94, 170, 0.5)",
              },
          ];

    return (
        <Grid container justifyContent="flex-end">
            <Grid item xs={3}>
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
            </Grid>
            <Grid item xs={12}>
                <LineChart
                    title={fieldLabel}
                    labels={data["index"]}
                    datasets={datasets}
                />
            </Grid>
        </Grid>
    );
};

export default QuestionnaireExpectedVsRealFieldChart;
