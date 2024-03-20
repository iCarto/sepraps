import {theme} from "Theme";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

export const PROJECT_TYPE_ICONS = {
    agua: {
        imgSrc: "https://cdn-icons-png.flaticon.com/512/292/292962.png",
        imgAlt: "Grifo",
    },
    agua_lluvia: {
        imgSrc: "https://cdn-icons-png.flaticon.com/512/3871/3871408.png",
        imgAlt: "Agua de lluvia",
    },
    alcantarillado: {
        imgSrc: "https://cdn-icons-png.flaticon.com/512/3399/3399239.png",
        imgAlt: "Tubería",
    },
    sanitarios: {
        imgSrc: "https://cdn-icons-png.flaticon.com/512/2452/2452227.png",
        imgAlt: "Sanitario",
    },
    default: {
        imgSrc: "https://cdn-icons-png.flaticon.com/512/57/57108.png",
        imgAlt: "Desconocido",
    },
};

const iconBoxStyle = {
    width: 30,
    height: 30,
    borderRadius: "50%",
    border: `solid 2px ${theme.palette.primary.dark}`,
    bgcolor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const ProjectTypeIcon = ({
    projectWorkData,
    showProjectClass = false,
    size = "small",
    style = {},
}) => {
    const projectType = projectWorkData.work_type;
    const maxWidth = size === "medium" ? {width: "28px"} : {width: "20px"};

    const {imgSrc, imgAlt} =
        PROJECT_TYPE_ICONS[projectType] || PROJECT_TYPE_ICONS.default;

    const tooltipTitle = showProjectClass ? (
        <>
            <strong>{projectWorkData.work_type_label}: </strong>{" "}
            {projectWorkData.work_class_label}
        </>
    ) : (
        projectWorkData.work_type_label
    );

    return (
        <Tooltip title={tooltipTitle}>
            <Box
                sx={{
                    ...iconBoxStyle,
                    ...style,
                }}
            >
                <img
                    src={imgSrc}
                    alt={imgAlt}
                    style={maxWidth}
                    aria-label={projectType}
                />
            </Box>
        </Tooltip>
    );
};

export default ProjectTypeIcon;
