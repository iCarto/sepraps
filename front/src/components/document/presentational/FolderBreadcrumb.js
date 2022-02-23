import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Stack from "@mui/material/Stack";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import Button from "@mui/material/Button";

const FolderBreadcrumb = ({path, basePath = ""}) => {
    const [breadcrumbFolders, setBreadcrumbFolders] = useState([]);

    useEffect(() => {
        if (path) {
            const pathFolders = path.split("/");
            let breadcrumbFolders = [];
            let auxPath = "";
            for (const pathFolder of pathFolders) {
                auxPath += pathFolder;
                breadcrumbFolders.push({
                    name: pathFolder,
                    path: auxPath,
                });
                auxPath += "/";
            }
            setBreadcrumbFolders(breadcrumbFolders);
        }
    }, [path]);

    return (
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
            <FolderOutlinedIcon />
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                divider={<ChevronRightOutlinedIcon />}
            >
                {breadcrumbFolders.map((breadcrumbFolder, index, {length}) => (
                    <Button
                        component={Link}
                        to={basePath + breadcrumbFolder.path}
                        variant="text"
                        color={index === length - 1 ? "inherit" : "primary"}
                        key={breadcrumbFolder.path}
                    >
                        {breadcrumbFolder.name}
                    </Button>
                ))}
            </Stack>
        </Stack>
    );
};

export default FolderBreadcrumb;
