import {useEffect, useState} from "react";

import {DocumentService} from "base/file/service";
import {Spinner} from "base/shared/components";
import Box from "@mui/material/Box";

const DEFAULT_NO_IMAGE = "/images/no_image.jpg";

const ImagePreview = ({path: url, alt = "", width = null, height = null, sx = {}}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const createBlob = async response => {
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        setImageUrl(blobUrl);
    };

    useEffect(() => {
        setLoading(true);
        if (url) {
            // A Blob is necessary because we have to load the image using AuthService
            DocumentService.preview(url)
                .then(response => {
                    createBlob(response);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setImageUrl(DEFAULT_NO_IMAGE);
                    setLoading(false);
                });
        } else {
            setImageUrl(DEFAULT_NO_IMAGE);
            setLoading(false);
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
                    borderRadius: 1,
                    ...sx,
                }}
            />
        ) : (
            <Box
                component="img"
                alt={alt}
                src={imageUrl}
                sx={{width: "100%", borderRadius: 1, ...sx}}
            />
        );
    };

    return loading ? <Spinner /> : getComponent();
};

export default ImagePreview;
