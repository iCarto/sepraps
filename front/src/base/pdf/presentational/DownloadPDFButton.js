import Button from "@mui/material/Button";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import Tooltip from "@mui/material/Tooltip";

const DownloadPDFButton = ({handleGeneratePDF, text = ""}) => {
    const handleClick = () => {
        handleGeneratePDF();
    };

    return (
        <Tooltip title="Descargar en PDF">
            <Button
                aria-label="download-PDF"
                onClick={handleClick}
                variant="contained"
                startIcon={<PrintOutlinedIcon />}
            >
                {text || "PDF"}
            </Button>
        </Tooltip>
    );
};

export default DownloadPDFButton;
