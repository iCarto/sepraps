import {useTheme} from "@emotion/react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({title, labels, datasets}) => {
    const theme = useTheme();

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    const chartData = {
        labels,
        datasets: datasets,
    };

    return <Line options={options} data={chartData} />;
};

export default LineChart;
