import {createRef} from "react";
import {Link} from "react-router-dom";
import {DocumentService} from "service/api";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const DocumentDownloadLink = ({path, name, contentType}) => {
    const link = createRef();

    const handleAction = async event => {
        event.preventDefault();

        const result = await DocumentService.getDocument(path, contentType);

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        const blob = await result.blob();
        const objectUrl = window.URL.createObjectURL(blob);

        anchor.download = name;
        anchor.href = objectUrl;

        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
        document.body.removeChild(anchor);
    };

    return (
        <Stack
            component={Link}
            to={path}
            style={{color: "inherit", textDecoration: "inherit"}}
            ref={link}
            onClick={e => handleAction(e)}
            justifyContent="center"
            alignItems="center"
        >
            {contentType.startsWith("image") ? (
                <ImageOutlinedIcon sx={{fontSize: 50}} />
            ) : (
                <ArticleOutlinedIcon sx={{fontSize: 50}} />
            )}
            <Typography>{name}</Typography>
        </Stack>
    );
};

export default DocumentDownloadLink;
