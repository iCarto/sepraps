import {useState} from "react";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const MapDownloadPngAction = ({onDownloadMapAsPng}) => {
    const [loading, setLoading] = useState(false);

    const handleDownloadMapAsPng = () => {
        setLoading(true);
        onDownloadMapAsPng(() => setLoading(false));
    };

    return (
        <Box
            sx={{
                width: "40px",
                height: "40px",
            }}
        >
            {loading ? (
                <CircularProgress size={22} sx={{ml: 1, mt: 1}} />
            ) : (
                <Tooltip title={"Descargar como imagen"}>
                    <IconButton
                        aria-label="download-image"
                        onClick={handleDownloadMapAsPng}
                        color="primary"
                    >
                        <ImageOutlinedIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
};

export default MapDownloadPngAction;
