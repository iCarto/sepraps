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

const StatsByGenderChart = ({data}) => {
    const options = {
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
    };

    const labels = data.map(row => row.gender_name);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Género personas Juntas de Saneamiento",
                data: data.map(row => row.total),
            },
        ],
    };

    return <Bar options={options} data={chartData} />;
};

export default StatsByGenderChart;
