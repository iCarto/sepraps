import {Link} from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

const FolderLink = ({path, basePath = "", name}) => {
    return (
        <Stack
            component={Link}
            to={basePath + path}
            style={{color: "inherit", textDecoration: "inherit"}}
            justifyContent="center"
            alignItems="center"
        >
            <FolderOutlinedIcon sx={{fontSize: 50}} />
            <Typography>{name}</Typography>
        </Stack>
    );
};

export default FolderLink;
