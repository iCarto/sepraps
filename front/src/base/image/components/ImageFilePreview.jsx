import {useEffect, useState} from "react";

import {DocumentService} from "base/file/service";
import {Spinner} from "base/shared/components";
import Box from "@mui/material/Box";

const DEFAULT_NO_IMAGE = "/images/no_image.jpg";

const ImageFilePreview = ({image, alt = "", width = null, height = null, sx = {}}) => {
    console.log({image});
    const getComponent = () => {
        return width && height ? (
            <Box
                component="div"
                alt={alt}
                sx={{
                    width,
                    height,
                    backgroundImage: `url(${window.URL.createObjectURL(image)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "top",
                    backgroundRepeat: "no-repeat",
                    ...sx,
                }}
            />
        ) : (
            <Box
                component="img"
                alt={alt}
                src={window.URL.createObjectURL(image)}
                sx={{width: "100%", ...sx}}
            />
        );
    };

    return getComponent();
};

export default ImageFilePreview;
