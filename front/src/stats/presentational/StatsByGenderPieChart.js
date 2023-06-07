import {Pie} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {NumberUtil} from "base/format/utilities";

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend);

const StatsByGenderPieChart = ({data}) => {
    const dataToDisplay = data.filter(item => item.gender !== "TOTAL");
    const total = data.find(item => item.gender === "TOTAL");

    const labels = dataToDisplay?.map(row => row.gender_name);

    const options = {
        scale: {
            ticks: {
                precision: 0,
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = `${context.label}: ${
                            context.formattedValue
                        } (${NumberUtil.getPercentage(context.parsed, total.total)})`;

                        return label;
                    },
                },
            },
        },
        responsive: true,
    };

    const chartData = {
        labels,
        datasets: [
            {
                data: dataToDisplay?.map(row => row.total),
                backgroundColor: ["rgb(163, 192, 90)", "rgb(255, 205, 86)"],
            },
        ],
    };

    return <Pie options={options} data={chartData} />;
};

export default StatsByGenderPieChart;
