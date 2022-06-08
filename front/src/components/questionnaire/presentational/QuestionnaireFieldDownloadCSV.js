import {useDownloadFile} from "hooks";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const QuestionnaireFieldDownloadCSV = ({path}) => {
    const downloadFile = useDownloadFile();

    const handleClick = async () => {
        console.log({path});
        downloadFile(path, "text/csv");
    };

    return (
        <Tooltip title="Descargar CSV" placement="bottom-end">
            <IconButton
                aria-label="download-csv"
                onClick={() => handleClick()}
                size="small"
            >
                <DownloadOutlinedIcon />
            </IconButton>
        </Tooltip>
    );
};

export default QuestionnaireFieldDownloadCSV;
