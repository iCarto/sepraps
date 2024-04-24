import {createRef} from "react";
import {useNavigate} from "react-router-dom";

import {useDownloadDocument} from "base/file/utilities";
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
    const downloadDocument = useDownloadDocument();

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

        downloadDocument(
            documentElement.name,
            documentElement.path,
            documentElement.content_type
        );
    };

    return (
        <Stack
            ref={link}
            onClick={e => handleClick(e)}
            onDoubleClick={e => handleDoubleClick(e)}
            justifyContent="center"
            alignItems="center"
            sx={{
                p: 2,
                backgroundColor: selected ? "grey.100" : "inherit",
                borderRadius: 3,
                color: "inherit",
                textDecoration: "inherit",
                cursor: "pointer",
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
