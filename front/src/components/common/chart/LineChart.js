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
import {useRef} from "react";
import {Line} from "react-chartjs-2";
import {DateUtil, DATE_FORMATS} from "utilities";

import DownloadChart from "./DownloadChart";
import Grid from "@mui/material/Grid";

const whiteBackgroundPlugin = {
    id: "custom_canvas_background_color",
    beforeDraw: chart => {
        const ctx = chart.canvas.getContext("2d");
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    },
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    whiteBackgroundPlugin
);

const LineChart = ({title, labels, datasets}) => {
    const chartRef = useRef(null);

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

    const chartFilename = `${DateUtil.formatDate(
        new Date(),
        DATE_FORMATS.FILE_DATETIMEFORMAT
    )}_${title.toLowerCase().replace(" ", "_")}.png`;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Line options={options} data={chartData} ref={chartRef} />
            </Grid>
            <Grid item container justifyContent="flex-end">
                <DownloadChart chartRef={chartRef} filename={chartFilename} />
            </Grid>
        </Grid>
    );
};

export default LineChart;
