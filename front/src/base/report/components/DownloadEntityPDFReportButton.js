import {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";

import {DocumentService} from "base/file/service";
import {useGetDataUrl} from "base/shared/utilities";
// import {useDownloadEntityPDFReport} from "../hooks";

import Button from "@mui/material/Button";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

const DownloadEntityPDFReportButton = () => {
    // TO-DO: Refactor this component --extract PDF-specific code

    const [imageUrl, setImageUrl] = useState(null);

    const entityData = useOutletContext()[1];
    // const {download: handleDownloadEntityReportPdf} = useDownloadEntityPDFReport();
    const getDataUrl = useGetDataUrl();

    useEffect(() => {
        if (entityData?.image) {
            // A Blob is necessary because we need to load the image using AuthService
            DocumentService.preview(entityData.image).then(response => {
                getDataUrl(response).then(dataUrl => {
                    setImageUrl(dataUrl);
                });
            });
        } else {
            setImageUrl(null);
        }
    }, [entityData]);

    // const handleGeneratePDF = () => {
    //     handleDownloadEntityReportPdf(entityData, imageUrl);
    // };

    return (
        <Button
            aria-label="download-PDF"
            title="Descargar PDF"
            // onClick={handleGeneratePDF}
            variant="contained"
            startIcon={<PrintOutlinedIcon />}
        >
            PDF
        </Button>
    );
};

export default DownloadEntityPDFReportButton;
