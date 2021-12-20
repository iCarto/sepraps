import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";

const Icon = ({icon, size}) => {
    let imgSrc = "";
    let imgAlt = "";
    let title = "";
    let ariaLabel = "";
    let maxWidth = {};
    switch (`${icon}`) {
        case "Agua Potable":
            imgSrc = "https://cdn-icons-png.flaticon.com/512/292/292962.png";
            imgAlt = "Grifo";
            title = "Agua potable";
            ariaLabel = "Agua";
            break;
        case "Saneamiento":
            imgSrc = "https://cdn-icons-png.flaticon.com/512/3399/3399239.png";
            imgAlt = "Tubería";
            title = "Saneamiento";
            ariaLabel = "Saneamiento";
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
        <Tooltip title={icon}>
            <img
                src={imgSrc}
                alt={imgAlt}
                style={maxWidth}
                title={icon}
                aria-label={icon}
            />
        </Tooltip>
    );
};

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.string,
};

export default Icon;
