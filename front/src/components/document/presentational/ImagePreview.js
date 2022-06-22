import {useEffect, useState} from "react";
import {DocumentService} from "service/api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const DEFAULT_NO_IMAGE = "/images/no_image.jpg";
const BLANK_IMAGE = "/images/blank_image.png";

const ImagePreview = ({
    path: url,
    alt = null,
    width = null,
    height = null,
    sx = {},
}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const createBlob = async response => {
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        setImageUrl(blobUrl);
    };

    useEffect(() => {
        if (url) {
            setLoading(true);
            // A Blob is necessary because we have to load the image using AuthService
            DocumentService.preview(url).then(response => {
                createBlob(response);
                setLoading(false);
            });
        } else {
            setImageUrl(DEFAULT_NO_IMAGE);
        }
    }, [url]);

    const getComponent = () => {
        return width && height ? (
            <Box
                component="div"
                alt={alt}
                sx={{
                    width,
                    height,
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    ...sx,
                }}
            />
        ) : (
            <Box component="img" alt={alt} src={imageUrl} sx={{width: "100%", ...sx}} />
        );
    };

    return loading ? (
        <Grid item container justifyContent="center" xs={12}>
            <CircularProgress color="inherit" size={20} />
        </Grid>
    ) : (
        getComponent()
    );
};

export default ImagePreview;
