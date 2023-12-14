import {useEffect, useRef} from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
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
import {Bar} from "react-chartjs-2";
import {DateUtil} from "base/format/utilities";

import Grid from "@mui/material/Grid";
import DownloadChartButton from "./DownloadChartButton";

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
    whiteBackgroundPlugin,
    ChartDataLabels
);

const BarChart = ({title, labels, datasets, options = {}, plugins = []}) => {
    useEffect(() => {
        plugins.map(plugin => ChartJS.register(plugin));

        return () => {
            plugins.map(plugin => ChartJS.unregister(plugin));
        };
    }, []);

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
        DateUtil.getToday()
    )}_${title.toLowerCase().replace(" ", "_")}.png`;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Bar options={chartOptions} data={chartData} ref={chartRef} />
            </Grid>
            <Grid item container justifyContent="flex-end">
                <DownloadChartButton chartRef={chartRef} filename={chartFilename} />
            </Grid>
        </Grid>
    );
};

export default BarChart;
