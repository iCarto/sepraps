import {createRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import {DocumentService} from "service/api";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const DocumentDetailItem = ({
    document: documentElement,
    basePath,
    selected = false,
    onSelect = null,
}) => {
    const link = createRef();

    const navigate = useNavigate();

    const handleClick = async event => {
        event.preventDefault();

        if (onSelect) {
            onSelect(documentElement);
        } else {
            navigate(basePath + documentElement.path);
        }
    };

    const handleDoubleClick = async event => {
        event.preventDefault();

        if (onSelect) {
            onSelect(documentElement.path);
        }

        const result = await DocumentService.download(
            documentElement.path,
            documentElement.content_type
        );

        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        const blob = await result.blob();
        const objectUrl = window.URL.createObjectURL(blob);

        anchor.download = documentElement.name;
        anchor.href = objectUrl;

        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
        document.body.removeChild(anchor);
    };

    return (
        <Stack
            style={{color: "inherit", textDecoration: "inherit"}}
            ref={link}
            onClick={e => handleClick(e)}
            onDoubleClick={e => handleDoubleClick(e)}
            justifyContent="center"
            alignItems="center"
            sx={{
                p: 2,
                backgroundColor: selected ? "grey.200" : "inherit",
                borderRadius: 3,
            }}
        >
            {documentElement.content_type.startsWith("image") ? (
                <ImageOutlinedIcon sx={{fontSize: 50}} />
            ) : (
                <ArticleOutlinedIcon sx={{fontSize: 50}} />
            )}
            <Typography>{documentElement.name}</Typography>
        </Stack>
    );
};

export default DocumentDetailItem;
