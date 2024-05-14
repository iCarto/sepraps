import useTheme from "@mui/material/styles/useTheme";

import {Pie} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    BarElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const StatsByPhasePieChart = ({data}) => {
    const theme = useTheme();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const labels = data.map(row => row.phase_name);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Nº Proyectos",
                data: data.map(row => row.total),
                borderColor: data.map(row => theme.palette[row.phase].main),
                backgroundColor: data.map(row => theme.palette[row.phase].light),
            },
        ],
    };

    return <Pie options={options} data={chartData} />;
};

export default StatsByPhasePieChart;
