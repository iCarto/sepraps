import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

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
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            divider={<ChevronRightOutlinedIcon />}
        >
            {breadcrumbFolders.map(breadcrumbFolder => (
                <Typography
                    component={Link}
                    to={basePath + breadcrumbFolder.path}
                    style={{color: "inherit", textDecoration: "inherit"}}
                    key={breadcrumbFolder.path}
                >
                    {breadcrumbFolder.name}
                </Typography>
            ))}
        </Stack>
    );
};

export default FolderBreadcrumb;
