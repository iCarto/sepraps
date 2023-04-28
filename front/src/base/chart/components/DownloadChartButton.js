import {useDownloadChart} from "base/chart/utilities";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const DownloadChartButton = ({chartRef, filename}) => {
    const DownloadChartButton = useDownloadChart();

    const handleClick = async () => {
        const base64Image = chartRef.current.toBase64Image();
        DownloadChartButton(base64Image, filename);
    };

    return (
        <Tooltip title="Descargar Imagen" placement="bottom-end">
            <IconButton
                aria-label="download-image"
                onClick={() => handleClick()}
                size="small"
            >
                <DownloadOutlinedIcon />
            </IconButton>
        </Tooltip>
    );
};

export default DownloadChartButton;
