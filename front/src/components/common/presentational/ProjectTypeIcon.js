import Tooltip from "@mui/material/Tooltip";

const ProjectTypeIcon = ({projectType, projectTypeName, size}) => {
    let imgSrc = "";
    let imgAlt = "";
    let maxWidth = {};
    switch (`${projectType}`) {
        case "agua":
            imgSrc = "https://cdn-icons-png.flaticon.com/512/292/292962.png";
            imgAlt = "Grifo";
            break;
        case "Saneamiento":
            imgSrc = "https://cdn-icons-png.flaticon.com/512/3399/3399239.png";
            imgAlt = "Tubería";
            break;

        default:
            imgSrc = "https://cdn-icons-png.flaticon.com/512/57/57108.png";
            imgAlt = "Desconocido";
    }
    switch (`${size}`) {
        case "medium":
            maxWidth = {width: "28px"};
            break;
        default:
            maxWidth = {width: "20px"};
            break;
    }
    return (
        <Tooltip title={`Tipo: ${projectTypeName}`}>
            <img src={imgSrc} alt={imgAlt} style={maxWidth} aria-label={projectType} />
        </Tooltip>
    );
};

export default ProjectTypeIcon;
