import {useNavigate} from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

const FolderDetailItem = ({
    folder,
    basePath = "",
    selected = false,
    onSelect = null,
}) => {
    const navigate = useNavigate();

    const handleClick = async event => {
        event.preventDefault();

        if (onSelect) {
            onSelect(folder);
        }
    };

    const handleDoubleClick = async event => {
        event.preventDefault();

        navigate(basePath + folder.path);
    };

    return (
        <Stack
            onClick={e => handleClick(e)}
            onDoubleClick={e => handleDoubleClick(e)}
            style={{color: "inherit", textDecoration: "inherit"}}
            justifyContent="center"
            alignItems="center"
            sx={{
                p: 2,
                backgroundColor: selected ? "grey.100" : "inherit",
                borderRadius: 3,
            }}
        >
            <FolderOutlinedIcon sx={{fontSize: 50}} color="primary" />
            <Typography sx={{color: "primary.main", fontWeight: "500"}}>
                {folder.name}
            </Typography>
        </Stack>
    );
};

export default FolderDetailItem;
