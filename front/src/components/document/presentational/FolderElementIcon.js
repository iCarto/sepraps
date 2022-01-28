import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

const FolderElementIcon = ({element, fontSize = 20}) => {
    return !element.content_type ? (
        <FolderOutlinedIcon sx={{fontSize}} />
    ) : element.content_type.startsWith("image") ? (
        <ImageOutlinedIcon sx={{fontSize}} />
    ) : (
        <ArticleOutlinedIcon sx={{fontSize}} />
    );
};

export default FolderElementIcon;
