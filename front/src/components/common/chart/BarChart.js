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
import {Bar} from "react-chartjs-2";
import {DateUtil} from "utilities";

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

const BarChart = ({title, labels, datasets, options = {}}) => {
    const chartRef = useRef(null);

    const chartOptions = {
        responsive: true,
        ...options,
    };

    const chartData = {
        labels,
        datasets: datasets,
    };

    const chartFilename = `${DateUtil.formatDateTimeForFilenames(
        new Date()
    )}_${title.toLowerCase().replace(" ", "_")}.png`;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Bar options={chartOptions} data={chartData} ref={chartRef} />
            </Grid>
            <Grid item container justifyContent="flex-end">
                <DownloadChart chartRef={chartRef} filename={chartFilename} />
            </Grid>
        </Grid>
    );
};

export default BarChart;
