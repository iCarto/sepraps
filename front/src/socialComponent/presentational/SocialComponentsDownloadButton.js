import {useState} from "react";

import {useDownload} from "base/file/utilities";
import {ServiceRequestFormat} from "base/api/utilities";
import {AlertError} from "base/error/components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";

const SocialComponentsDownloadButton = ({service}) => {
    const download = useDownload();

    const [error, setError] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const downloadData = format => {
        setError(null);
        service(format)
            .then(response => {
                download(response);
            })
            .catch(error => {
                setError(error);
            });
    };

    const handleDownloadCSV = () => {
        downloadData(ServiceRequestFormat.CSV);
        handleClose();
    };

    return (
        <div>
            <Tooltip title="Descargar tabla" placement="bottom-end">
                <IconButton aria-label="download-table" onClick={handleClick}>
                    <DownloadOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleDownloadCSV}>
                    <ListItemIcon>
                        <TextSnippetOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>CSV</ListItemText>
                </MenuItem>
            </Menu>
            {error && <AlertError error={error} />}
        </div>
    );
};

export default SocialComponentsDownloadButton;
