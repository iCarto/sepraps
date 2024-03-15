import Tooltip from "@mui/material/Tooltip";

const PROJECT_TYPE_ICONS = {
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

const ProjectTypeIcon = ({projectWorkData, size}) => {
    const projectType = projectWorkData.work_type;
    const maxWidth = size === "medium" ? {width: "28px"} : {width: "20px"};

    const {imgSrc, imgAlt} =
        PROJECT_TYPE_ICONS[projectWorkData.work_type] || PROJECT_TYPE_ICONS.default;

    const tooltipTitle = (
        <>
            <strong>{projectWorkData.work_type_label}: </strong>{" "}
            {projectWorkData.work_class_label}
        </>
    );

    return (
        <Tooltip title={tooltipTitle}>
            <img src={imgSrc} alt={imgAlt} style={maxWidth} aria-label={projectType} />
        </Tooltip>
    );
};

export default ProjectTypeIcon;
