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
            justifyContent="center"
            alignItems="center"
            sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: selected ? "grey.100" : "inherit",
                color: "inherit",
                textDecoration: "inherit",
                cursor: "pointer",
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
