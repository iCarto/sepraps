import useTheme from "@mui/material/styles/useTheme";

import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    BarElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatsByPhaseChart = ({data}) => {
    const theme = useTheme();

    const options = {
        indexAxis: "y",
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        scale: {
            ticks: {
                precision: 0,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: false,
            },
        },
    };

    const labels = data.map(row => row.phase_name);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Nº proyectos",
                data: data.map(row => row.total),
                borderColor: data.map(row => theme.palette[row.phase].main),
                backgroundColor: data.map(row => theme.palette[row.phase].light),
            },
        ],
    };

    return <Bar options={options} data={chartData} />;
};

export default StatsByPhaseChart;
