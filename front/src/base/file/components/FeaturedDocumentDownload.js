import {useDownloadFile} from "base/file/utilities";

import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const FeaturedDocumentDownload = ({featuredDocument}) => {
    const downloadFile = useDownloadFile();

    const handleClick = async () => {
        downloadFile(featuredDocument);
    };

    return (
        <Grid item container justifyContent="flex-start">
            <Tooltip title="Descargar ficha" placement="bottom-end">
                <Button
                    aria-label="download-document"
                    onClick={() => handleClick()}
                    startIcon={<InsertDriveFileOutlinedIcon />}
                    variant="outlined"
                >
                    Ficha
                </Button>
            </Tooltip>
        </Grid>
    );
};

export default FeaturedDocumentDownload;
