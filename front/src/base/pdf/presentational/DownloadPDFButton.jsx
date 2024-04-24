import Button from "@mui/material/Button";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Tooltip from "@mui/material/Tooltip";
import {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";

const DownloadPDFButton = ({handleGeneratePDF, text = ""}) => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        handleGeneratePDF().then(result => {
            setLoading(false);
        });
    };

    return (
        <Tooltip title="Descargar en PDF">
            <Button
                aria-label="download-PDF"
                onClick={handleClick}
                variant="contained"
                startIcon={<PrintOutlinedIcon />}
                disabled={loading}
            >
                {text || "PDF"}
                {loading && <CircularProgress size={22} sx={{ml: 1, mt: 1}} />}
            </Button>
        </Tooltip>
    );
};

export default DownloadPDFButton;
